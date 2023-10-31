import React from "react";
import { EmployeeDocument } from "@/types/document";
import TableRowAction from "../actionButton/table/TableRowAction";

interface Props {
  doc: EmployeeDocument[];
  getEmployeeDoc: (elt: EmployeeDocument | null) => void;
  deleteEmployeeDoc: (elt: EmployeeDocument | null, id: string | "") => void;
}

const DocumentTable = ({ doc, getEmployeeDoc, deleteEmployeeDoc }: Props) => {
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
          <TableRowAction
            elt={elt}
            index={index}
            getEmployeeDoc={getEmployeeDoc}
            deleteEmployeeDoc={deleteEmployeeDoc}
            key={elt.id}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;
