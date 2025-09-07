'use client';

import { useRouter } from "next/navigation";
import allbufos from "./allbufos";

function getRandomIndex(): number {
    return Math.floor(Math.random() * allbufos.length);
}

export default function Intro() {
    const router = useRouter();

    return (
        <div id="intro">
            <img
                src="https://raw.githubusercontent.com/knobiknows/all-the-bufo/refs/heads/main/all-the-bufo/bufo-detective.png"
                height={200}
                alt="Detective Bufo"
            />
            <p className="padded">
                Can you guess the name of the bufo emoji?
            </p>
            <button onClick={() => router.push("/?index=" + getRandomIndex())}>
                Start!
            </button>
        </div>
    );
}
