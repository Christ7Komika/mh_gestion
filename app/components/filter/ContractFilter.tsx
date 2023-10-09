import React from "react";
import Search from "../input/Search";
import Select from "../input/Select";

const ContractFilter = () => {
  return (
    <div className="w-full flex gap-2">
      <Search />
      <Select data={contract} label="Type de contrat" />
      <Select data={status} label="Status" />
    </div>
  );
};

const contract = ["CDD", "CDI", "Stage", "Prestataire"];
const status = ["En cour", "Terminé", "Bientôt a terme"];

export default ContractFilter;
