"use client";
import type { Signature } from "@prisma/client";
import classes from "./SignatureToCheck.module.css";
import { approveSignature } from "./petitionServerActions";

type Props = Signature;
export default function SignatureToCheck({ name, email, id }: Props) {
    const handleApprove = async () => {
        await approveSignature(id, true);
    };
    const handleDelete = async () => {
        await approveSignature(id, false);
    };
    return (
        <li className={classes.signature}>
            {name ?? "Freund von Wale"} {email}
            <button onClick={handleApprove}>Annehmen</button>
            <button onClick={handleDelete}>Löschen</button>
        </li>
    );
}
