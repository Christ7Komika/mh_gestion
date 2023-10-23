import React from "react";
import State from "../state/State";
type Doc = {
  document: string;
  isExpired: boolean;
  comment: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  OtherDocumentType: {
    name: string;
  }[];
};

interface Props {
  doc: Doc[];
}

const DocumentTable = ({ doc }: Props) => {
  function restDate(date2: string): number | string {
    const date1Obj = new Date();
    const date2Obj = new Date(date2);

    const differenceEnMillisecondes = date2Obj.getTime() - date1Obj.getTime();
    const joursRestants = differenceEnMillisecondes / (1000 * 60 * 60 * 24);

    if (joursRestants < 0) {
      return "Expiré";
    } else {
      return joursRestants;
    }
  }
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 ">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal">
        <tr>
          <th className="align-middle">ID</th>
          <th className="align-middle w-32">Expiration</th>
          <th className="align-middle w-32">Date début</th>
          <th className="align-middle w-32">Date fin</th>
          <th className="align-middle w-32">Date d'ajout</th>
          <th className="align-middle">Option</th>
        </tr>
      </thead>
      <tbody>
        {doc.map((elt, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              !(index % 2 === 0) ? "white" : "blue-200"
            }`}
          >
            <td className="text-center ">{index + 1}</td>
            <td className="text-center">
              {typeof restDate(elt.endDate) === "number" ? (
                <State
                  color="emerald"
                  label={`${restDate(elt.endDate)} jour(s)`}
                />
              ) : (
                <State color="red" label={`${restDate(elt.endDate)}`} />
              )}
            </td>
            <td className="text-center">
              {" "}
              {elt.startDate
                ? new Date(elt.startDate).toLocaleDateString()
                : "-"}
            </td>
            <td className="text-center">
              {elt.endDate ? new Date(elt.endDate).toLocaleDateString() : "-"}
            </td>
            <td className="text-center">
              {new Date(elt.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <div className="flex justify-center gap-2 px-1">
                <span className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;
