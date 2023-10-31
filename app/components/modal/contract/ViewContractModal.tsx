"use client";
import { dateDelay, duration, restDate } from "@/lib/helpers";
import { host } from "@/lib/host";
import { Contract } from "@/types/contract";
import State from "../../state/State";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  contract: Contract;
}

const ViewContractModal = ({ handleClose, contract }: Props) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25">
      <div className="w-full max-w-[500px] rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-500 font-bold text-xl uppercase">
            Infos contrat
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
            <h2 className="text-slate-500 font-bold text-base uppercase">
              Nom de l'employé
            </h2>
            <span className="text-slate-500 text-md ">{`${contract.employee.firstName} ${contract.employee.lastName}`}</span>
          </div>
          <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
            <h2 className="text-slate-500 font-bold text-base uppercase">
              Type de contrat
            </h2>
            <span className="text-slate-500 text-md ">{contract.type}</span>
          </div>
          <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-center">
            <h2 className="text-slate-500 font-bold text-base uppercase">
              Status
            </h2>
            <span className="text-slate-500 text-md ">
              {restDate(contract.endDate) === "Expiré" ? (
                <State color="red" label={`Expiré`} />
              ) : (
                <State color="emerald" label={`En cour`} />
              )}
            </span>
          </div>
          <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
            <h2 className="text-slate-500 font-bold text-base uppercase">
              Durée
            </h2>
            <span className="text-slate-500 text-md ">
              {dateDelay(
                new Date(contract.startDate),
                new Date(contract.endDate)
              )}
            </span>
          </div>
          <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
            <h2 className="text-slate-500 font-bold text-base uppercase">
              Date de début
            </h2>
            <span className="text-slate-500 text-md ">
              {contract.startDate}
            </span>
          </div>
          {contract.endDate && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Date de fin
              </h2>
              <span className="text-slate-500 text-md ">
                {contract.endDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewContractModal;
