import LocationFinder from "@/components/LocationFinder/LocationFinder";
import { Metadata } from "next";

export const matadata: Metadata = {
    title: "Standorte",
};

export default function StandortePage() {
    return (
        <>
            <h1>StandortePage</h1>
            <LocationFinder />
        </>
    );
}
