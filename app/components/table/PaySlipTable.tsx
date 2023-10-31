import { PaySlip } from "@/types/payslip";
import EditLeaveAction from "../actionButton/leave/EditLeaveAction";
import RemoveLeaveAction from "../actionButton/leave/RemoveLeaveAction";
import EditPayslipAction from "../actionButton/payslip/EditPaySlipAction";
import RemovePayslipAction from "../actionButton/payslip/RemovePaySlipAction";
import ViewPaySlipAction from "../actionButton/payslip/ViewPaySlipAction";
import { cut } from "@/helpers/helpers";
import Link from "next/link";
import { FaFile } from "react-icons/fa";

interface Props {
  data: PaySlip[];
}

const PaySlipTable = ({ data }: Props) => {
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 ">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal">
        <tr>
          <th className="align-middle">ID</th>
          <th className="align-middle">Nom</th>
          <th className="align-middle">Somme</th>
          <th className="align-middle">Date de payement</th>
          <th className="align-middle">Commentaire</th>
          <th className="align-middle">Date d'ajout</th>
          <th className="align-middle">Option</th>
        </tr>
      </thead>
      <tbody>
        {data.map((payslip, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              index % 2 === 0 ? "blue-200" : "white"
            }  `}
          >
            <td className="text-center ">{index + 1}</td>
            <td className="text-center">
              {cut(
                `${payslip.employee.lastName} ${payslip.employee.firstName}`,
                20
              )}
            </td>
            <td className="text-center">{payslip.salary} XAF</td>
            <td className="text-center">
              {new Date(payslip.payementDate).toLocaleDateString()}
            </td>
            <td className="text-center"> {cut(payslip.comment, 20)}</td>
            <td className="text-center">
              {" "}
              {new Date(payslip.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <div className="flex justify-center gap-2 px-1">
                {payslip.file && (
                  <Link
                    href={`/upload/${payslip.file}`}
                    className="h-4 w-4 rounded-full bg-gray-500 flex cursor-pointer text-white justify-center items-center"
                  >
                    <FaFile size={10} />
                  </Link>
                )}
                <ViewPaySlipAction payslip={payslip} />
                {/* <EditPayslipAction />
                <RemovePayslipAction /> */}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaySlipTable;
