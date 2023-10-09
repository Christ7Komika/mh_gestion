import Card from "@/app/components/card/Card";
import SanctionTable from "@/app/components/table/SanctionTable";
import LeaveFilter from "@/app/components/filter/LeaveFilter";
import AddLeaveAction from "@/app/components/actionButton/leave/AddLeaveAction";

const Leave = () => {
  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <LeaveFilter />
        <div className="w-full flex gap-4">
          <Card name="Congés en cour" value={15} />
          <Card name="Congés terminé" value={15} />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Liste des congés
          </h2>
          <AddLeaveAction />
        </div>
      </div>
      <div className="w-full mt-8">
        <SanctionTable />
        <div className="w-full flex justify-center items-center py-2">
          <button className="px-8 py-2 rounded border border-slate-400 hover:bg-slate-400 text-sm transition cursor-pointer">
            Charger plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leave;
