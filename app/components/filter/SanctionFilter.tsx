import React from "react";
import Search from "../input/Search";
import Select from "../input/Select";

const SanctionFilter = () => {
  return (
    <div className="w-full flex gap-2">
      <Search />
      <Select data={status} label="Status" />
    </div>
  );
};

const status = ["En cour", "Terminé", "Bientôt à terme"];

export default SanctionFilter;
