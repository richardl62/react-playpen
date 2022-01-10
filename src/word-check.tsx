import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import styled from "styled-components";
import { isLegalWord } from "./is-legal-word";

const WordInput = styled.input`
  margin-right: 0.2em;
`;
const ValidityMessage = styled.span<{ valid: boolean; }> `
  font-size: large;
  color: ${props => props.valid ? "default" : "red"};
`;

function Validity({ valid }: { valid: boolean; }) {
    return <ValidityMessage valid={valid}>
        {valid ? "Valid" : "Not valid"}
    </ValidityMessage>;
}

export function WordChecker(): JSX.Element {
    const [word, setEnteredWord] = useState("");
    const [valid, setValid] = useState<boolean | "unknown">("unknown");

    const asyncRawWordList = useAsync(() =>
        import("./legal-word-raw-string").then(m => m.legalWordsRawString), []
    );

    if(asyncRawWordList.loading) {
        return <div>Loading ...</div>
    }

    if(asyncRawWordList.error) {
        return <div>Error</div>
    }

    const rawWordList = asyncRawWordList.result;
    if(!rawWordList) {
        return <div>Unexpected result from useAsync()</div>
    }
    const legalWords = rawWordList.split("\n");

    const onWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawWord = e.target.value;
        const word = rawWord.replace(/[^A-Za-z]/gi, "");
        setEnteredWord(word);
        setValid("unknown");
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setValid(isLegalWord(word, legalWords));
        e.preventDefault();
    };


    return (
        <form onSubmit={onSubmit}>

            <WordInput
                type="text"
                placeholder={"Word to check"}
                value={word}
                spellCheck={false}
                onChange={onWordChange} />

            {valid === "unknown" ?
                (word && <input type="submit" value="Check" />) :
                <Validity valid={valid} />}
        </form>
    );
}
