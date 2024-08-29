"use client";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import classes from "./PetitionForm.module.css";
import { addSignature } from "./petitionServerActions";
import { useEffect, useRef } from "react";
export default function PetitionForm() {
    const formRef = useRef<HTMLFormElement>(null!);
    const [formState, formAction] = useFormState(addSignature, {
        message: "",
        status: "",
    });

    /* Nutzt useEffect, um das Formularelement mit der Formularmethode
	reset() zurückzusetzen, falls der Status in formState "success" ist. */
    useEffect(() => {
        if (formState.status === "success") {
            formRef.current.reset();
        }
    }, [formState]);

    return (
        <form className={classes.form} action={formAction} ref={formRef}>
            <div className={classes.inputs}>
                <div className={classes.inputWrapper}>
                    <label htmlFor="name">Name (optional)</label>
                    <input
                        id="name"
                        name="name"
                        maxLength={100}
                        autoComplete="name"
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <label htmlFor="email">E-Mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                    />
                </div>
            </div>
            <label>
                <input type="checkbox" name="privacy" value="accept" />
                Ich stimme den Datenschutzbedingungen zu
            </label>
            <SubmitButton
                readyContent={<strong>Jetzt unterschreiben!</strong>}
            />
            <strong className={classes.message}>{formState.message}</strong>
        </form>
    );
}
