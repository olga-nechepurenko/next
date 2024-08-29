import Link from "next/link";

type Props = {
    poster: {
        id: number;
        url: string;
        eventId: number;
    } | null;
    Venue: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
    }[];
    id: number;
    name: string;
    description: string | null;
    date: Date;
    posterId?: number;
    venueId: number;
};
export default function EventTeaser({
    id,
    name,
    description,
    date,
    category,
    poster,
    Venue,
}: Props) {
    return (
        <article>
            <h2>
                {/* Nach /veranstaltungen/ noch id einfügen */}
                <Link href={`/veranstaltungen/${id}`}>{name}</Link>
            </h2>

            <dl>
                <dt>Datum:</dt>
                <dd>
                    <time dateTime={date.toDateString().substring(0, 10)}>
                        {new Date(date).toLocaleDateString("de")}
                    </time>
                </dd>
                <dt>Veranstaltungsort:</dt>
                <dd>{Venue.name}</dd>
                {/* Kategorien nur darstellen, wenn es welche gibt.
Beschriftung mit Singular oder Plural.
Kategorien kommagetrennt auflisten.
*/}
                {category.length > 0 && (
                    <>
                        <dt>Kategor{category.length > 1 ? "ien:" : "ie:"}</dt>
                        <dd>
                            {category
                                .map((category) => category.name)
                                .join(", ")}
                        </dd>
                    </>
                )}
            </dl>
        </article>
    );
}
