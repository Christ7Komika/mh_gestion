"use client";
import { PaySlip } from "@/types/payslip";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  payslip: PaySlip;
}

const ViewPayslipModal = ({ handleClose, payslip }: Props) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25">
      <div className="w-full max-w-[500px] rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-500 font-bold text-xl uppercase">
            Infos bulletin de paie
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          {payslip.employee && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Nom de l'employé
              </h2>
              <span className="text-slate-500 text-md ">{`${payslip.employee.firstName} ${payslip.employee.lastName}`}</span>
            </div>
          )}
          {payslip.salary && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Salaire
              </h2>
              <span className="text-slate-500 text-md ">{`${payslip.salary}`}</span>
            </div>
          )}
          {payslip.payementDate && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Date payement
              </h2>
              <span className="text-slate-500 text-md ">{`${new Date(
                payslip.payementDate
              ).toLocaleDateString()}`}</span>
            </div>
          )}

          {payslip.comment && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Commentaire
              </h2>
              <span className="text-slate-500 text-md ">{payslip.comment}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPayslipModal;
