import { Contract } from "@/types/contract";
import EditContractAction from "../actionButton/contract/EditContractAction";
import RemoveContractAction from "../actionButton/contract/RemoveContractAction";
import State from "../state/State";
import { cut } from "@/helpers/helpers";
import { dateDelay, duration, restDate } from "@/lib/helpers";
import ViewContractAction from "../actionButton/contract/ViewContractAction";
import Link from "next/link";

interface Props {
  data: Contract[];
}

const ContracTable = ({ data }: Props) => {
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 ">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal">
        <tr>
          <th className="align-middle">ID</th>
          <th className="align-middle">Nom</th>
          <th className="align-middle">Type</th>
          <th className="align-middle">Status</th>
          <th className="align-middle">Durée</th>
          <th className="align-middle">Date début</th>
          <th className="align-middle">Date fin</th>
          <th className="align-middle">Date d'ajout</th>
          <th className="align-middle">Option</th>
        </tr>
      </thead>
      <tbody>
        {data.map((contract, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              index % 2 === 0 ? "blue-200" : "white"
            } `}
          >
            <td className="text-center ">{index + 1}</td>
            <td className="text-center">
              {cut(
                `${contract.employee.lastName} ${contract.employee.firstName}`,
                20
              )}
            </td>
            <td className="text-center">{contract.type}</td>
            <td className="text-center">
              {!contract.endDate ? (
                "-"
              ) : contract.endDate === "inconnu" ? (
                <State color="emerald" label={`En cour`} />
              ) : typeof restDate(contract.endDate) === "number" ? (
                <State
                  color="emerald"
                  label={`${
                    Number(restDate(contract.endDate)) >= 1
                      ? `${restDate(contract.endDate)} jour${
                          Number(restDate(contract.endDate)) > 1 ? "s" : ""
                        }`
                      : "moins de 24h"
                  }`}
                />
              ) : (
                <State color="red" label={`${restDate(contract.endDate)}`} />
              )}
            </td>
            <td className="text-center">
              {!contract.endDate ||
              !contract.startDate ||
              contract.startDate > contract.endDate ||
              contract.endDate === "inconnu"
                ? "-"
                : dateDelay(
                    new Date(contract.startDate),
                    new Date(contract.endDate)
                  )}
            </td>
            <td className="text-center">
              {new Date(contract.startDate).toLocaleDateString()}
            </td>
            <td className="text-center">
              {contract.endDate === "inconnu"
                ? "-"
                : new Date(contract.endDate).toLocaleDateString()}
            </td>
            <td className="text-center">
              {new Date(contract.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <div className="flex justify-center gap-2 px-1">
                <Link
                  href={`/upload/${contract.file}`}
                  target="_blank"
                  className="h-4 w-4 rounded-full bg-gray-500 block cursor-pointer"
                />
                <ViewContractAction contract={contract} />
                <EditContractAction id={contract.id} />
                <RemoveContractAction id={contract.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContracTable;
