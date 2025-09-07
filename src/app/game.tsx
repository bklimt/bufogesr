'use client';

import { useCallback, useEffect, useState } from "react";
import allbufos from "./allbufos";
import { useRouter } from "next/navigation";

import { trace } from '@opentelemetry/api';

function hasBeenGuessed(c: string, guesses: string): boolean {
    return !c.match(/[a-z]/i) || guesses.indexOf(c.toLowerCase()) >= 0;
}

function fillOutGuesses(word: string, guesses: string): string {
    return word.split('').map(c => hasBeenGuessed(c, guesses) ? c : "_").join('');
}

function getRandomIndex(): number {
    return Math.floor(Math.random() * allbufos.length);
}

export default function Game(props: { word: string, type: string }) {
    const [guesses, setGuesses] = useState("bufo");
    const [guess, setGuess] = useState(fillOutGuesses(props.word, "bufo"));
    const [misses, setMisses] = useState("");
    const [won, setWon] = useState(false);
    const [done, setDone] = useState(false);

    const router = useRouter();

    const tracer = trace.getTracer("bufogesr-game");

    function guessLetter(c: string) {
        const newGuesses = guesses + c.toLowerCase();
        setGuesses(newGuesses);
        updateGuess(newGuesses);
    }

    function updateGuess(guesses: string) {
        const word = props.word;
        const guess = fillOutGuesses(word, guesses);
        setGuess(guess);
        const missCount = guesses.split('').filter(c => word.indexOf(c) < 0).length;
        setMisses("X ".repeat(missCount).trim());
        if (word === guess) {
            if (!done) {
                const span = tracer.startSpan("win");
                span.setAttribute("word", word);
                span.setAttribute("guesses", guesses);
                span.end();
            }

            setWon(true);
            setDone(true);
        }
        if (missCount >= 5) {
            if (!done) {
                const span = tracer.startSpan("loss");
                span.setAttribute("word", word);
                span.setAttribute("guesses", guesses);
                span.end();
            }
            setDone(true);
        }
    }

    function Letter(props: { letter: string }) {
        const letter = props.letter;
        return (
            <button
                className="letter"
                onClick={_ => guessLetter(letter)}
                disabled={hasBeenGuessed(letter, guesses)}
            >
                {letter}
            </button>
        );
    }

    function newWord() {
        router.push("/?index=" + getRandomIndex());
    }

    const handleKeyDown = useCallback((event: { key: string; }) => {
        if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
            if (guesses.indexOf(event.key.toLowerCase()) < 0) {
                guessLetter(event.key);
            }
        }
    }, [guesses]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, guesses]);

    return (
        <div className="game">
            <img
                src={"https://raw.githubusercontent.com/knobiknows/all-the-bufo/refs/heads/main/all-the-bufo/" + props.word + "." + props.type}
                height={200}
                alt="the mystery bufo"
            />
            <div className="guess">{guess}</div>
            {!won && <div className="misses">{misses}</div>}
            {won && <div className="won">You won!</div>}
            <table>
                <tbody>
                    <tr>
                        <td><Letter letter="A" /></td>
                        <td><Letter letter="B" /></td>
                        <td><Letter letter="C" /></td>
                        <td><Letter letter="D" /></td>
                        <td><Letter letter="E" /></td>
                        <td><Letter letter="F" /></td>
                        <td><Letter letter="G" /></td>
                    </tr>
                    <tr>
                        <td><Letter letter="H" /></td>
                        <td><Letter letter="I" /></td>
                        <td><Letter letter="J" /></td>
                        <td><Letter letter="K" /></td>
                        <td><Letter letter="L" /></td>
                        <td><Letter letter="M" /></td>
                        <td><Letter letter="N" /></td>
                    </tr>
                    <tr>
                        <td><Letter letter="O" /></td>
                        <td><Letter letter="P" /></td>
                        <td><Letter letter="Q" /></td>
                        <td><Letter letter="R" /></td>
                        <td><Letter letter="S" /></td>
                        <td><Letter letter="T" /></td>
                        <td><Letter letter="U" /></td>
                    </tr>
                    <tr>
                        <td><Letter letter="V" /></td>
                        <td><Letter letter="W" /></td>
                        <td><Letter letter="X" /></td>
                        <td><Letter letter="Y" /></td>
                        <td><Letter letter="Z" /></td>
                    </tr>
                </tbody>
            </table>
            <p className="padded"></p>
            {done && <button onClick={newWord}>Give me another!</button>}
        </div >
    );
}
