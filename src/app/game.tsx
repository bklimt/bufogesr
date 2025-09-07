'use client';

import { useState } from "react";

function hasBeenGuessed(c: string, guesses: string): boolean {
    return !c.match(/[a-z]/i) || guesses.indexOf(c.toLowerCase()) >= 0;
}

function fillOutGuesses(word: string, guesses: string): string {
    return word.split('').map(c => hasBeenGuessed(c, guesses) ? c : "_").join('');
}

export default function Game(props: { word: string }) {
    const [guesses, setGuesses] = useState("bufo");
    const [guess, setGuess] = useState(fillOutGuesses(props.word, "bufo"));
    const [misses, setMisses] = useState("");

    function guessLetter(c: string) {
        const newGuesses = guesses + c.toLowerCase();
        setGuesses(newGuesses);
        updateGuess(newGuesses);
    }

    function updateGuess(guesses: string) {
        const word = props.word;
        setGuess(fillOutGuesses(word, guesses));
        const missCount = guesses.split('').filter(c => word.indexOf(c) < 0).length;
        setMisses("X ".repeat(missCount).trim());
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

    return (
        <div>
            <p className="guess">
                <span className="guess">{guess}</span>
            </p>
            <p className="misses">
                <span className="misses">{misses}</span>
            </p>
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
        </div>
    );
}
