import type { Metadata } from "next";
import prisma from "@/prisma/db";
import classes from "./petition.module.css";
import Link from "next/link";
import Image from "next/image";

import saveTheWhales from "@/img/save-the-whales.jpg";
import PendingSignatures from "@/components/Petition/PendingSignatures";
import ServerActionDemo from "@/components/Petition/ServerActionDemo";
import PetitionForm from "@/components/Petition/PetitionForm";

/* Pages erhalten automatisch searchParams als Prop */
type Props = {
    searchParams: {
        page?: string;
        perPage?: string;
    };
};

const defaultPerPage = 3;

export const metadata: Metadata = {
    title: "🐳 Rettet die Wale - Jetzt unterschreiben!",
};

export default async function PetitionPage({
    searchParams: { page = "", perPage = "" },
}: Props) {
    const perPageNumber = Math.max(
        1,
        Math.min(100, parseInt(perPage) || defaultPerPage)
    );

    //all Items
    const totalItemsCount = await prisma.signature.count({
        where: {
            approved: true,
        },
    });

    const totalPages = Math.ceil(totalItemsCount / perPageNumber);

    let currentPage = Math.max(1, parseInt(page) || 1);
    if (currentPage > totalPages) {
        currentPage = 1;
    }

    // Fetch items for the current page
    const paginatedItems = await prisma.signature.findMany({
        take: perPageNumber,
        skip: (currentPage - 1) * perPageNumber,
        where: {
            approved: true,
        },
        orderBy: {
            date: "asc",
        },
    });

    const perPageParam =
        perPageNumber !== defaultPerPage ? `&perPage=${perPageNumber}` : "";

    /* Setzt eine Pagination um. Standardmäßig sollen z.B. nur die ersten 2
	Unterschriften angezeigt werden. Aber über den Search-Parameter page
	soll die Seite konfigurierbar sein, mit dem Parameter perPage soll man
	angeben können, dass mehr Unterschriften pro Seite sichtbar sind.
	Versucht möglichst, ungültige oder extreme Werte für page und perPage
	zu vermeiden.
	*/

    /* Nutzt die Methode count von prisma, um die Anzahl der approved
	Unterschriften in die Variable totalSignatures zu speichern. */

    /* Die Ergebnisse sollen in anderer Reihenfolge aus der Datenbank kommen, älteste
Unterschriften zuerst. */

    return (
        <>
            <h1 className={classes.heading}>Rettet die Wale!</h1>

            {/* Ein Bild mit Hilfe der Next Image-Komponente hier erstellen, mit den korrekten
Attributen, z.B. korrekte sizes-Angabe */}
            <Image
                src={saveTheWhales}
                alt="Rettet die Wale!"
                className={classes.image}
                sizes="(width<32rem) 90vw, 30rem"
                placeholder="blur"
            ></Image>

            <p className={classes.intro}>
                {/* Bittet eine KI, euch einen Text mit 100 Wörtern zu generieren, der zum Thema
passt. */}
                Wir müssen dringend handeln, um die Wale vor dem Aussterben zu
                bewahren. Diese majestätischen Meeresbewohner spielen eine
                entscheidende Rolle im Ökosystem der Ozeane. Ihre Bestände sind
                jedoch durch Wilderei, Umweltverschmutzung, Klimawandel und
                zerstörerische Fischereimethoden stark gefährdet. Besonders
                betroffen sind Arten wie der Blauwal und der Finnwal, deren
                Populationen in den letzten Jahrzehnten dramatisch
                zurückgegangen sind. Es ist unsere Pflicht, diese einzigartigen
                Lebewesen zu schützen. Durch strengere Gesetze gegen Walfang,
                den Ausbau von Meeresschutzgebieten und die Reduzierung der
                Meeresverschmutzung können wir aktiv dazu beitragen, das
                Überleben dieser Arten zu sichern. Mit Ihrer Unterstützung
                können wir Regierungen und internationale Organisationen dazu
                bewegen, wirksame Maßnahmen zu ergreifen. Unterzeichnen Sie
                diese Petition und setzen Sie sich gemeinsam mit uns für den
                Schutz der Wale ein. Jede Stimme zählt – lassen Sie uns jetzt
                handeln, bevor es zu spät ist!
            </p>
            <strong>Schon {totalItemsCount} haben unterschrieben!</strong>

            {/* Nutzt das start-Attribut von ol, um die korrekten Nummern anzuzeigen.
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
*/}
            <ol
                className={classes.list}
                start={(currentPage - 1) * perPageNumber + 1}
            >
                {paginatedItems.map(({ name, date, id }) => (
                    <li key={id}>
                        {name || "Freund*in der Wale"} (
                        <time dateTime={date.toISOString().substring(0, 10)}>
                            {date.toLocaleDateString("de")}
                        </time>
                        )
                    </li>
                ))}
            </ol>
            {/*
        	Fügt hier zwei Next-Link-Komponenten ein, mit denen man auf die jeweils nächste
        	Seite navigieren kann. Der Link "Weitere" bzw. "Vorige Unterschriften" soll nur
        	sichtbar sein, wenn es weitere bzw. vorige Unterschriten gibt.
        	*/}
            {totalPages > 0 && (
                <nav className={classes.pagination} aria-label="Pagination">
                    {/* Previous Button */}
                    {currentPage > 1 && (
                        <Link
                            href={`?page=${currentPage - 1}${perPageParam}`}
                            scroll={false}
                        >
                            Previous
                        </Link>
                    )}

                    {/* Next Button */}
                    {currentPage < totalPages && (
                        <Link
                            href={`?page=${currentPage + 1}${perPageParam}`}
                            scroll={false}
                        >
                            Next
                        </Link>
                    )}
                </nav>
            )}
            <PetitionForm />
            <PendingSignatures />
        </>
    );
}
