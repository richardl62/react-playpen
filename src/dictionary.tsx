import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";



export function Dictionary({ word }: { word: string }): JSX.Element {
  const [definition, setDefinition] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response: AxiosResponse) => {
        setDefinition(response.data[0].meanings[0].definitions[0].definition);
      })
      .catch((error: Error) => {
        setDefinition("Not found");
      });
  }, [word, definition]);

  return <div>
    {definition || "No definition found"}
  </div>
    ;
}
  
  export default Dictionary;