import React, { useState } from 'react';
import './App.css';


const DICTIONARY_API_BASE_URL =
    'https://api.dictionaryapi.dev/api/v2/entries/en/';

const fetchWordDefinitions = async (word: string) => {
    console.log(`Making request for definitions of ${word}...`);

    const response = await fetch(DICTIONARY_API_BASE_URL + word);
    const json = await response.json();
    console.log(json)
    return Array.isArray(json) ? "found" : "not found";
};

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const onCheckWord = () => {
    setDefinition("...")

    fetchWordDefinitions(word).then(defintions => 
      setDefinition(word + defintions)
    )
    .catch(_ => {
        setDefinition(`Could not retrive any defintions for ${word}`)
    });
  }
  return <div>
    <div>
      <input
        value={word}
        onChange={event => setWord(event.target.value)}
      />
      <button onClick={onCheckWord}>
          Check word
      </button>
    </div>

    <div>{definition}</div>

    </div>
}
export default App;
