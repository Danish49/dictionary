import Search from "./assets/search.svg";
import { useState, useEffect } from "react";
import Loader from "./loader";
import Dictionary from "./dictionary";

export default function Form() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDefinition = async (searchWord) => {
    if (!searchWord.trim()) return;

    setIsLoading(true);
    setMeanings([]);
    setError(null);

    try {
      const response = await fetch(
        `https://freedictionaryapi.com/api/v1/entries/en/${encodeURIComponent(
          searchWord.trim()
        )}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Word not found. Please try a different word.");
        }

        throw new Error("Failed to fetch dictionary data.");
      }

      const data = await response.json();

      /*
        Current API response:

        {
          word: "...",
          entries: [...],
          source: {...}
        }
      */

      const formattedMeanings = data.entries.map((entry) => ({
        word: data.word,

        phonetics: entry.pronunciations || [],

        meanings: [
          {
            partOfSpeech: entry.partOfSpeech,

            definitions: (entry.senses || []).map((sense) => ({
              definition: sense.definition,
              example:
                sense.examples && sense.examples.length > 0
                  ? sense.examples[0]
                  : null,
            })),
          },
        ],

        sourceUrls: data.source?.url ? [data.source.url] : [],
      }));

      setMeanings(formattedMeanings);
    } catch (error) {
      console.error("Dictionary API error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDefinition("hello");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDefinition(word);
  };

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <input
            autoComplete="off"
            type="text"
            placeholder="Search for any word..."
            id="input-field"
            value={word}
            onChange={handleChange}
          />

          <button className="search" type="submit">
            <img width="32px" src={Search} alt="Search" />
          </button>
        </div>
      </form>

      {isLoading && <Loader />}

      {!isLoading && (
        <Dictionary
          meanings={meanings}
          error={error}
        />
      )}
    </>
  );
}
