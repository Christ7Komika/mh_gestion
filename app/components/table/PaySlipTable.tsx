import EditLeaveAction from "../actionButton/leave/EditLeaveAction";
import RemoveLeaveAction from "../actionButton/leave/RemoveLeaveAction";

const PaySlipTable = () => {
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
        <tr className="h-12 text-gray-700 text-sm bg-blue-200">
          <td className="text-center ">1</td>
          <td className="text-center">Komika Christopher</td>
          <td className="text-center">200 000 XAF</td>
          <td className="text-center">29/09/2022</td>
          <td className="text-center">Lorem ipsum dolor sit amet.</td>
          <td className="text-center">29/09/2022</td>
          <td className="text-center">
            <div className="flex justify-center gap-2 px-1">
              <span className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer" />
              <EditLeaveAction />
              <RemoveLeaveAction />
            </div>
          </td>
        </tr>
        <tr className="h-12 text-gray-700 text-sm bg-white">
          <td className="text-center ">2</td>
          <td className="text-center">Komika Christopher</td>
          <td className="text-center">200 000 XAF</td>
          <td className="text-center">29/09/2022</td>
          <td className="text-center">Lorem ipsum dolor sit amet.</td>
          <td className="text-center">29/09/2022</td>
          <td className="text-center">
            <div className="flex justify-center gap-2 px-1">
              <span className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer" />
              <EditLeaveAction />
              <RemoveLeaveAction />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PaySlipTable;
