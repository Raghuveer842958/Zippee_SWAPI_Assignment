import React, { useState, useMemo } from "react";
import { useFetchCharacters, Character } from "../hooks/useFetchCharacters";
import { CharacterCard } from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";

const speciesOptions = ["All", "Human", "Droid", "Wookiee", "Other"];

const Home = () => {
    console.log("home page called!!!");
  const { characters, loading, error, page, totalPages, goToPage } =
    useFetchCharacters();

  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const openModal = (character: Character) => setSelectedCharacter(character);
  const closeModal = () => setSelectedCharacter(null);

  // Filter characters based on search and species
  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      const matchesName = c.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSpecies =
        speciesFilter === "All" ||
        (c.species.length === 0 && speciesFilter === "Other") ||
        c.species.includes(speciesFilter);
      return matchesName && matchesSpecies;
    });
  }, [characters, searchTerm, speciesFilter]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Star Wars Characters</h1>

      {/* Search and Filter UI */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-1"
          disabled={loading}
        />
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="border rounded p-2 w-48"
          disabled={loading}
        >
          {speciesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-500">
          Loading characters, please wait...
        </p>
      )}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && filteredCharacters.length === 0 && (
        <p className="text-center">No characters found matching criteria.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {!loading &&
          filteredCharacters.map((character) => (
            <CharacterCard
              key={character.url}
              name={character.name}
              species={character.species}
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
