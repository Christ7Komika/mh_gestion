import Card from "@/app/components/card/Card";
import PaySlipFilter from "@/app/components/filter/PaySlipFilter";
import AddPaySlipAction from "@/app/components/actionButton/payslip/AddPaySlipAction";
import PaySlipTable from "@/app/components/table/PaySlipTable";

const PaySlip = () => {
  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <PaySlipFilter />
        <div className="w-full flex gap-4">
          <Card name="Bulletin de paie total" value={15} />
          <Card name="Salaire payé" value={15} />
          <Card name="Salaire non payé" value={15} />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Bulletin de paie
          </h2>
          <AddPaySlipAction />
        </div>
      </div>
      <div className="w-full mt-8">
        <PaySlipTable />
        <div className="w-full flex justify-center items-center py-2">
          <button className="px-8 py-2 rounded border border-slate-400 hover:bg-slate-400 text-sm transition cursor-pointer">
            Charger plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaySlip;
