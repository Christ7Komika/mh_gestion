import { Employee } from "@/types/api/employee";
import RemoveEmployee from "../actionButton/employee/RemoveEmployee";
import ViewEmployee from "../actionButton/employee/ViewEmployee";
import State from "../state/State";
import { cut } from "@/helpers/helpers";
import Image from "next/image";

interface Props {
  data: Employee[];
}

const EmployeTable = ({ data }: Props) => {
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 mb-5">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal sticky top-[272px] shadow">
        <tr>
          <th className="align-middle">ID</th>
          <th className="align-middle">Image</th>
          <th className="align-middle">Nom</th>
          <th className="align-middle">Téléphone</th>
          <th className="align-middle">Contrat</th>
          <th className="align-middle">Congé</th>
          <th className="align-middle">Sanction</th>
          <th className="align-middle">Date d'ajout</th>
          <th className="align-middle">Option</th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              index % 2 === 0 ? "blue-200" : "white"
            }  `}
          >
            <td className="text-center ">{index + 1}</td>
            <td className="text-center ">
              {employee.profil ? (
                <div className="w-9 h-9 rounded-full m-auto relative ">
                  <Image
                    src={"/upload/" + employee.profil}
                    fill
                    alt={`Profil image ${employee.firstName} ${employee.lastName}`}
                    className="object-cover rounded-full mx-auto "
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-100 m-auto"></div>
              )}
            </td>
            <td className="text-center">
              {cut(`${employee.lastName} ${employee.firstName}`, 20)}
            </td>
            <td className="text-center">{employee.phone}</td>
            <td className="text-center">
              {employee.Contract.length >= 1
                ? `${
                    employee.Contract.find(
                      (contract) => contract.isNew === true
                    )?.type
                  }`
                : "-"}
            </td>
            <td className="text-center">
              {employee.Leave.length >= 1 ? (
                <State
                  color="blue"
                  label={
                    employee.Leave.find((leave) => leave.isNew === true)!.status
                  }
                />
              ) : (
                "-"
              )}
            </td>
            <td className="text-center">
              {employee.Sanction.length >= 1 ? (
                <State
                  color="blue"
                  label={
                    employee.Sanction.find(
                      (sanction) => sanction.isNew === true
                    )!.status
                  }
                />
              ) : (
                "-"
              )}
            </td>
            <td className="text-center">
              {new Date(employee.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <div className="flex justify-center gap-2">
                <ViewEmployee id={employee.id} />
                {!(
                  employee.Contract.length >= 1 ||
                  employee.Leave.length >= 1 ||
                  employee.OtherDocument.length >= 1 ||
                  employee.Sanction.length >= 1
                ) && (
                  <RemoveEmployee
                    id={employee.id}
                    employee={`${employee.lastName} ${employee.firstName}`}
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeTable;
