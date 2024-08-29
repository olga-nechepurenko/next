import EventTeaser from "@/components/Veranstaltungen/EventTeaser";
import prisma from "@/prisma/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Veranstaltungen",
};

export default async function VearanstaltungenPage() {
    const events = await prisma.event.findMany({
        include: {
            poster: true,
            Venue: true,
            category: true,
        },
    });

    return (
        <>
            <h1>Veranstaltungen</h1>
            {events.map((event) => (
                <EventTeaser key={event.id} {...event} />
            ))}
        </>
    );
}
