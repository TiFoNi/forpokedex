"use client";
import React, { useState, ChangeEvent } from "react";
import s from "./SearchPokemon.module.scss";

interface SearchPokemonProps {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const SearchPokemon: React.FC<SearchPokemonProps> = ({
  onSearch,
  searchText,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    onSearch(newSearchText);
  };

  const handleSearch = () => {};

  return (
    <div className="container input-group mb-3 mt-3">
      <input
        type="text"
        className={`form-control ${s.myButton}`}
        placeholder="Search for a Pokemon"
        aria-label="Search for a Pokemon"
        aria-describedby="search-button"
        onChange={handleInputChange}
        value={searchText}
      />
      <button
        className={`btn btn-outline-secondary ${s.myButton}`}
        type="button"
        id="search-button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchPokemon;
