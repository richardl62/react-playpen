
export function isLegalWord(word: string, legalWords: string[]) {
    const revisedWord = word.trim().toLocaleLowerCase();

    // KLUDGE: For reasons I don't understand legalWords.includes("")
    // Returns true
    return revisedWord !== "" && legalWords.includes(revisedWord);
}

// console.log(legalWords.length, legalWords[1], legalWords[legalWords.length-1])
// function test(word: string) {
//     console.log(`"${word}"`, isLegalWord(word));
// }

// test("");
// test(" cAt ");
// test("ca?");
// test("reaso")

