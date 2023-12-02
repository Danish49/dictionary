import Search from "./assets/search.svg";
import { useState, useEffect } from "react";
import Loader from "./loader";
import Dictionary from "./dictionary";

export default function Form() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDefination = async () => {
    setIsLoading(true);
    setMeanings([]);
    setError(null);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.status === 404) {
        throw new Error("Word not found. Please try a different word.");
      } else if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setMeanings(data);
      setIsLoading(false);
      setWord("");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDefinationOnMount = () => {
      async function fetchData() {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/dart`
        );
        const data = await response.json();
        setMeanings(data);
        setIsLoading(false);
      }
      fetchData();
    };
    fetchDefinationOnMount();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDefination();
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
            <img width={"32px"} src={Search} alt="" />
          </button>
        </div>
      </form>

      {isLoading && <Loader />}
      {!isLoading && meanings && (
        <Dictionary meanings={meanings} error={error} />
      )}
    </>
  );
}
