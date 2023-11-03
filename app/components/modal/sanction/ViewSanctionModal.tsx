"use client";
import { dateDelay, duration, restDate } from "@/lib/helpers";
import { host } from "@/lib/host";
import State from "../../state/State";
import { Sanction } from "@/types/sanction";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  sanction: Sanction;
}

const ViewSanctionModal = ({ handleClose, sanction }: Props) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25">
      <div className="w-full max-w-[500px] rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-500 font-bold text-xl uppercase">
            Infos sanctiom
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          {sanction.employee && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Nom de l'employé
              </h2>
              <span className="text-slate-500 text-md ">{`${sanction.employee.firstName} ${sanction.employee.lastName}`}</span>
            </div>
          )}
          {sanction.endDate && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-center">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Status
              </h2>
              <span className="text-slate-500 text-md ">
                {restDate(sanction.endDate) === "Expiré" ? (
                  <State color="red" label={`Expiré`} />
                ) : (
                  <State color="emerald" label={`En cour`} />
                )}
              </span>
            </div>
          )}
          {!sanction.endDate ||
          !sanction.startDate ||
          sanction.startDate > sanction.endDate ? (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Durée
              </h2>
              <span className="text-slate-500 text-md ">inconnu</span>
            </div>
          ) : (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Durée
              </h2>
              <span className="text-slate-500 text-md ">
                {dateDelay(
                  new Date(sanction.startDate),
                  new Date(sanction.endDate)
                )}
              </span>
            </div>
          )}
          {sanction.startDate && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Date de début
              </h2>
              <span className="text-slate-500 text-md ">
                {sanction.startDate}
              </span>
            </div>
          )}
          {sanction.endDate && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Date de fin
              </h2>
              <span className="text-slate-500 text-md ">
                {sanction.endDate}
              </span>
            </div>
          )}
          {sanction.motif && (
            <div className="w-full flex flex-col h-auto  bg-slate-50 rounded p-2 items-start">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Motif de la sanction
              </h2>
              <span className="text-slate-500 text-left">{sanction.motif}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSanctionModal;
