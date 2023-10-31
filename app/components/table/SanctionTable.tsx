import { Sanction } from "@/types/sanction";
import EditLeaveAction from "../actionButton/leave/EditLeaveAction";
import RemoveLeaveAction from "../actionButton/leave/RemoveLeaveAction";
import State from "../state/State";
import { cut } from "@/helpers/helpers";
import { dateDelay } from "@/lib/helpers";
import Link from "next/link";
import { FaFile } from "react-icons/fa";
import ViewSanctionAction from "../actionButton/sanction/ViewSanctionAction";
import EditSanctionAction from "../actionButton/sanction/EditSanctionAction";
import RemoveSanctionAction from "../actionButton/sanction/RemoveSanctionAction";

interface Props {
  data: Sanction[];
}

const SanctionTable = ({ data }: Props) => {
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
        {data.map((sanction, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              index % 2 === 0 ? "blue-200" : "white"
            }  `}
          >
            <td className="text-center ">{index + 1}</td>
            <td className="text-center">
              {cut(
                `${sanction.employee.lastName} ${sanction.employee.firstName}`,
                20
              )}
            </td>
            <td className="text-center">
              {sanction.motif ? cut(sanction.motif, 20) : "-"}
            </td>
            <td className="text-center">
              {sanction.status ? (
                <State color="emerald" label="En cour" />
              ) : (
                "-"
              )}
            </td>
            <td className="text-center">
              {!sanction.endDate ||
              !sanction.startDate ||
              sanction.startDate > sanction.endDate
                ? "-"
                : dateDelay(
                    new Date(sanction.startDate),
                    new Date(sanction.endDate)
                  )}
            </td>
            <td className="text-center">
              {!sanction.startDate
                ? "-"
                : new Date(sanction.startDate).toLocaleDateString()}
            </td>
            <td className="text-center">
              {!sanction.endDate
                ? "-"
                : new Date(sanction.endDate).toLocaleDateString()}
            </td>
            <td className="text-center">
              {new Date(sanction.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <div className="flex justify-center gap-2 px-1">
                {sanction.file && (
                  <Link
                    href={`/upload/${sanction.file}`}
                    className="h-4 w-4 rounded-full bg-gray-500 flex cursor-pointer text-white justify-center items-center"
                  >
                    <FaFile size={10} />
                  </Link>
                )}
                <ViewSanctionAction sanction={sanction} />
                <EditSanctionAction id={sanction.id} />
                <RemoveSanctionAction id={sanction.id} pos={index + 1} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SanctionTable;
