import React, { useState, useMemo, useEffect } from "react";
import { useFetchCharacters, Character } from "../hooks/useFetchCharacters";
import { CharacterCard } from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const speciesOptions = ["All", "Human", "Droid", "Other"];

const Home = () => {
  const { characters, loading, error, page, totalPages, goToPage } =
    useFetchCharacters();

  const [speciesMap, setSpeciesMap] = useState<Record<string, string>>({});

  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    const fetchAllSpecies = async () => {
      let allSpecies: any[] = [];
      let nextUrl: string | null = "https://swapi.dev/api/species/";

      while (nextUrl) {
        const res = await fetch(nextUrl);
        const data = await res.json();
        allSpecies = allSpecies.concat(data.results);
        nextUrl = data.next;
      }

      const map: Record<string, string> = {};
      allSpecies.forEach((species) => {
        map[species.url] = species.name;
      });
      setSpeciesMap(map);
    };

    fetchAllSpecies();
  }, []);

  const openModal = (character: Character) => setSelectedCharacter(character);
  const closeModal = () => setSelectedCharacter(null);

  const filteredCharacters = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return characters.filter((c) => {
      const matchesName = c.name.toLowerCase().includes(lowerSearch);

      const speciesNames = c.species.map((url) => speciesMap[url] || "Unknown");

      const matchesSpecies =
        speciesFilter === "All" ||
        (speciesNames.length === 0 && speciesFilter === "Other") ||
        speciesNames.includes(speciesFilter);

      return matchesName && matchesSpecies;
    });
  }, [characters, searchTerm, speciesFilter, speciesMap]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Star Wars Characters</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-1"
          disabled={loading}
          aria-label="Search characters by name"
        />
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="border rounded p-2 w-48"
          disabled={loading}
          aria-label="Filter characters by species"
        >
          {speciesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && filteredCharacters.length === 0 && (
        <p className="text-center">No characters found matching criteria.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {!loading &&
          filteredCharacters.map((character) => (
            <CharacterCard
              key={character.url}
              name={character.name}
              gender={character.gender ?? "unknown"}
              birthYear={character.birth_year || "Unknown"}
              onClick={() => openModal(character)}
            />
          ))}
      </div>

      <div className="flex justify-center items-center gap-4 my-6">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1 || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
