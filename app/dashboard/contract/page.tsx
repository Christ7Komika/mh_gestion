import Card from "@/app/components/card/Card";
import ContractFilter from "@/app/components/filter/ContractFilter";
import AddContract from "@/app/components/actionButton/contract/AddContract";
import ContracTable from "@/app/components/table/ContractTable";

const Contract = () => {
  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <ContractFilter />
        <div className="w-full flex gap-4">
          <Card name="Contrat en cour" value={15} />
          <Card name="Contrat terminé" value={15} />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Liste des contrats
          </h2>
          <AddContract />
        </div>
      </div>
      <div className="w-full mt-8">
        <ContracTable />
        <div className="w-full flex justify-center items-center py-2">
          <button className="px-8 py-2 rounded border border-slate-400 hover:bg-slate-400 text-sm transition cursor-pointer">
            Charger plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contract;
