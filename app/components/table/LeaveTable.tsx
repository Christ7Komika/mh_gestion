import EditLeaveAction from "../actionButton/leave/EditLeaveAction";
import RemoveLeaveAction from "../actionButton/leave/RemoveLeaveAction";
import State from "../state/State";
import { cut } from "@/helpers/helpers";
import { dateDelay } from "@/lib/helpers";
import Link from "next/link";
import { FaFile } from "react-icons/fa";
import ViewSanctionAction from "../actionButton/sanction/ViewSanctionAction";
import { Leave } from "@/types/leave";
import ViewLeaveAction from "../actionButton/leave/ViewLeaveAction";

interface Props {
  data: Leave[];
}

const LeaveTable = ({ data }: Props) => {
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 ">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal">
        <tr>
          <th className="align-middle">ID</th>
          <th className="align-middle">Nom</th>
          <th className="align-middle">Motif</th>
          <th className="align-middle">Status</th>
          <th className="align-middle">Durée</th>
          <th className="align-middle">Date début</th>
          <th className="align-middle">Date fin</th>
          <th className="align-middle">Date d'ajout</th>
          <th className="align-middle">Option</th>
        </tr>
      </thead>
      <tbody>
        {data.map((leave, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              index % 2 === 0 ? "blue-200" : "white"
            }  `}
          >
            <td className="text-center ">{index + 1}</td>
            <td className="text-center">
              {cut(
                `${leave.employee.lastName} ${leave.employee.firstName}`,
                20
              )}
            </td>
            <td className="text-center">
              {leave.motif ? cut(leave.motif, 20) : "-"}
            </td>
            <td className="text-center">
              {leave.status ? <State color="emerald" label="En cour" /> : "-"}
            </td>
            <td className="text-center">
              {!leave.endDate ||
              !leave.startDate ||
              leave.startDate > leave.endDate
                ? "-"
                : dateDelay(new Date(leave.startDate), new Date(leave.endDate))}
            </td>
            <td className="text-center">
              {!leave.startDate
                ? "-"
                : new Date(leave.startDate).toLocaleDateString()}
            </td>
            <td className="text-center">
              {!leave.endDate
                ? "-"
                : new Date(leave.endDate).toLocaleDateString()}
            </td>
            <td className="text-center">
              {new Date(leave.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <div className="flex justify-center gap-2 px-1">
                {leave.file && (
                  <Link
                    href={`/upload/${leave.file}`}
                    className="h-4 w-4 rounded-full bg-gray-500 flex cursor-pointer text-white justify-center items-center"
                  >
                    <FaFile size={10} />
                  </Link>
                )}
                <ViewLeaveAction leave={leave} />
                <EditLeaveAction id={leave.id} />
                <RemoveLeaveAction id={leave.id} pos={index + 1} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveTable;
