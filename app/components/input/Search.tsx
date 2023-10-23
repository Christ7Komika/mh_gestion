"use client";
import React, { useEffect } from "react";
import { useState } from "react";

interface Props {
  searchFilter?: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchFilter }: Props) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (searchFilter) {
      searchFilter(search);
    }
  }, [search]);
  return (
    <input
      placeholder="Recherche"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      className="h-10 rounded bg-slate-100 p-2 outline-slate-300 outline-2 text-slate-600 w-full"
    />
  );
};

export default Search;
