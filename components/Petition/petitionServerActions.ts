"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

export async function serverTest(count: number) {
    console.log("Hallo auf dem Server!");

    return Math.pow(count, 2);
}

export async function approveSignature(id: string, approve: boolean) {
    /* Mit Hilfe von prisma die zur id passende Unterschrift entweder löschen
	oder den approved-Status auf true setzen. */
    if (approve) {
        await prisma.signature.update({
            where: {
                id,
            },
            data: {
                approved: true,
            },
        });
        console.log("updated");
    } else {
        await prisma.signature.delete({ where: { id } });
        console.log("deleted");
    }

    /*
	Löscht den Cache für die angegebene Route und aktualisiert die Anzeige:
	https://nextjs.org/docs/app/api-reference/functions/revalidatePath */
    revalidatePath("/petition");
}

/* 1. Mit zfd ein Schema erstellen, dass zum Formular passt.
https://www.npmjs.com/package/zod-form-data
	2. Mit der Schema-Methode safeParse formData parsen.
	3. Die Daten in die Datenbank mit Hilfe von prisma eintragen
	4. Bonus: Vor dem Eintragen mit einer weiteren Datenbankanfrage
	prüfen, ob bereits ein Eintrag mit der Mailadresse existiert,
	und nur dann den neuen Eintrag machen, wenn die Mailadresse
	noch nicht in der Datenbank vorhanden ist.
	*/

export async function addSignature(data: FormData) {
    const formSchema = zfd.formData({
        name: zfd.text(),
        //email: zfd.email(),
        privacy: z.literal("accept"),
    });
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const privacy = data.get("privacy") as string;

    const dataObject = formSchema.parse(data);

    await prisma.signature.create({
        data: {
            name,
            email,
            approved: false,
        },
    });
}
