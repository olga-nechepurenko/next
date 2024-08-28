"use client";
import classes from "./PetitionForm.module.css";
import { addSignature } from "./petitionServerActions";
export default function PetitionForm() {
    return (
        <form className={classes.form} action={addSignature}>
            <div className={classes.inputs}>
                <div className={classes.inputWrapper}>
                    <label htmlFor="name">Name (optional)</label>
                    <input id="name" name="name" type="text" />
                    <label htmlFor="email">E-Mail</label>
                    <input
                        id="email"
                        name="email"
                        type="e-mail"
                        autoComplete="email"
                    />
                </div>
            </div>
            <label>
                {" "}
                <input type="checkbox" name="privacy" value="accept" /> I accept
                the privacy policy <input type="checkbox" />
            </label>
            <button type="submit">Jetzt unterschreiben</button>
        </form>
    );
}
