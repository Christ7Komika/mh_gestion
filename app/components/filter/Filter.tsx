import React from "react";
import Search from "../input/Search";
import Select from "../input/Select";

const Filter = () => {
  return (
    <div className="w-full flex gap-2">
      <Search />
      <Select data={contract} />
      <Select data={leave} />
      <Select data={sanction} />
    </div>
  );
};

const contract = ["CDD", "CDI", "Stage", "Prestataire"];
const leave = ["Non", "En cour"];
const sanction = ["Non", "En cour"];

export default Filter;
