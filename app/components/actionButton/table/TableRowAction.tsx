import { EmployeeDocument } from "@/types/document";
import React, { useState } from "react";
import State from "../../state/State";
import { restDate } from "@/lib/helpers";
import Link from "next/link";

interface Props {
  elt: EmployeeDocument;
  index: number;
  getEmployeeDoc: (elt: EmployeeDocument | null) => void;
  deleteEmployeeDoc: (elt: EmployeeDocument | null, id: string | "") => void;
}

const TableRowAction = ({
  elt,
  index,
  getEmployeeDoc,
  deleteEmployeeDoc,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <tr
      className={` border-b-2  h-12 text-gray-700 text-sm bg-${
        !(index % 2 === 0) ? "white" : "blue-100"
      } ${selected ? "border-blue-400" : ""}`}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <td className="text-center ">{index + 1}</td>
      <td className="text-center">
        {!elt.endDate ? (
          "-"
        ) : typeof restDate(elt.endDate) === "number" ? (
          <State
            color="emerald"
            label={`${
              Number(restDate(elt.endDate)) >= 1
                ? `${restDate(elt.endDate)} jour${
                    Number(restDate(elt.endDate)) > 1 ? "s" : ""
                  }`
                : "- 24h"
            }`}
          />
        ) : (
          <State color="red" label={`${restDate(elt.endDate)}`} />
        )}
      </td>
      <td className="text-center">
        {" "}
        {elt.startDate ? new Date(elt.startDate).toLocaleDateString() : "-"}
      </td>
      <td className="text-center">
        {elt.endDate ? new Date(elt.endDate).toLocaleDateString() : "-"}
      </td>
      <td className="text-center">
        {new Date(elt.createdAt).toLocaleDateString()}
      </td>
      <td className="text-center">
        <div className="flex justify-center gap-2 px-1">
          <span
            className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
            onClick={() => getEmployeeDoc(elt)}
          />
          <Link
            className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer"
            href={`/upload/${elt.document}`}
          ></Link>
          <span
            className="h-4 w-4 rounded-full bg-red-500 block cursor-pointer"
            onClick={() => deleteEmployeeDoc(null, elt.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRowAction;
