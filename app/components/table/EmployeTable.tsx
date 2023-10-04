import RemoveEmployee from "../actionButton/employee/RemoveEmployee";
import ViewEmployee from "../actionButton/employee/ViewEmployee";
import State from "../state/State";

const EmployeTable = () => {
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 ">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal">
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
        <tr className="h-12 text-gray-700 text-sm bg-blue-200">
          <td className="text-center ">1</td>
          <td className="text-center">
            <div className="w-9 h-9 rounded-full bg-slate-100 m-auto"></div>
          </td>
          <td className="text-center">Komika Christopher</td>
          <td className="text-center">05 575 16 25</td>
          <td className="text-center">CDD</td>
          <td className="text-center">
            <State color="blue" label="Aucun" />
          </td>
          <td className="text-center">
            <State color="red" label="En cour" />
          </td>
          <td className="text-center">27/09/2023</td>
          <td className="text-center">
            <div className="flex justify-center gap-2">
              <ViewEmployee />
              <RemoveEmployee />
            </div>
          </td>
        </tr>
        <tr className="h-12 text-gray-700 text-sm bg-white">
          <td className="text-center ">1</td>
          <td className="text-center">
            <div className="w-9 h-9 rounded-full bg-slate-100 m-auto"></div>
          </td>
          <td className="text-center">Komika Christopher</td>
          <td className="text-center">05 575 16 25</td>
          <td className="text-center">CDD</td>
          <td className="text-center">
            <State color="blue" label="Aucun" />
          </td>
          <td className="text-center">
            <State color="red" label="En cour" />
          </td>
          <td className="text-center">27/09/2023</td>
          <td className="text-center">
            <div className="flex justify-center gap-2">
              <ViewEmployee />
              <RemoveEmployee />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmployeTable;
