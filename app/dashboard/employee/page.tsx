import { FaUserPlus } from "react-icons/fa";
import Card from "@/app/components/card/Card";
import Filter from "@/app/components/filter/Filter";
import EmployeTable from "@/app/components/table/EmployeTable";
import AddEmployee from "@/app/components/actionButton/employee/AddEmployee";

const Employees = () => {
  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <Filter />
        <div className="w-full flex gap-4">
          <Card name="Total employé" value={15} />
          <Card name="Contrat en cour" value={15} />
          <Card name="Contrat terminé" value={15} />
          <Card name="Congé en cour" value={15} />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Liste des employés
          </h2>
          <AddEmployee />
        </div>
      </div>
      <div className="w-full mt-8">
        <EmployeTable />
        <div className="w-full flex justify-center items-center py-2">
          <button className="px-8 py-2 rounded border border-slate-400 hover:bg-slate-400 text-sm transition cursor-pointer">
            Charger plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employees;
