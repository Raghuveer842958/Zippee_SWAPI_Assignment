import { useState, useEffect } from "react";

export interface Character {
  name: string;
  height: string;
  mass: string;
  species: string[];
  birth_year: string;
  homeworld: string;
  films: string[];
  url: string;
  [key: string]: any; // for other dynamic props
}

interface UseFetchCharactersResult {
  characters: Character[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const PAGE_SIZE = 10; // SWAPI returns 10 per page

export function useFetchCharacters(): UseFetchCharactersResult {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        const data = await response.json();

        setCharacters(data.results); // array of characters
        const count = data.count;
        setTotalPages(Math.ceil(count / PAGE_SIZE));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const goToPage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  return { characters, loading, error, page, totalPages, goToPage };
}
