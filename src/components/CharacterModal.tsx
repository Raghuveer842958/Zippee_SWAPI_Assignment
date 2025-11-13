import React, { useEffect, useState } from "react";
import { Character } from "../hooks/useFetchCharacters";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./LoadingSpinner";
// import { LoadingSpinner } from "./LoadingSpinner";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

const fetchHomeworld = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch homeworld");
  return res.json();
};

const formatDateAdded = (url: string) => {
  try {
    const id = url.match(/\/people\/(\d+)\//)?.[1];
    if (!id) return "Unknown";
    const date = new Date(2023, 0, Number(id));
    return date.toLocaleDateString();
  } catch {
    return "Unknown";
  }
};

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  const [homeworld, setHomeworld] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchHomeworld(character.homeworld)
      .then((data) => setHomeworld(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [character.homeworld]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-lg w-full p-6 relative overflow-auto max-h-[90vh] text-gray-900 dark:text-gray-100 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{character.name}</h2>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        ) : (
          <>
            <p>
              <strong>Height:</strong>{" "}
              {(parseFloat(character.height) / 100).toFixed(2)} m
            </p>
            <p>
              <strong>Mass:</strong> {character.mass} kg
            </p>
            <p>
              <strong>Birth Year:</strong> {character.birth_year}
            </p>
            <p>
              <strong>Date Added:</strong> {formatDateAdded(character.url)}
            </p>
            <p>
              <strong>Number of Films:</strong> {character.films.length}
            </p>

            {homeworld && (
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-1">Homeworld Details:</h3>
                <p>Name: {homeworld.name}</p>
                <p>Terrain: {homeworld.terrain}</p>
                <p>Climate: {homeworld.climate}</p>
                <p>Population: {homeworld.population}</p>
              </div>
            )}
          </>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
