import { cut } from "@/helpers/helpers";
import { User } from "../../dashboard/user/page";
import EditUserAction from "../actionButton/user/EditUserAction";
import RemoveUserAction from "../actionButton/user/RemoveUserAction";
import ViewUserAction from "../actionButton/user/ViewUserAction";

interface Props {
  data: User[];
}

const UserTable = ({ data }: Props) => {
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 ">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal">
        <tr>
          <th className="align-middle">ID</th>
          <th className="align-middle">Utilisateur</th>
          <th className="align-middle">Role</th>
          <th className="align-middle">Mode de passe</th>
          <th className="align-middle">Date d'ajout</th>
          <th className="align-middle">Option</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              index % 2 === 0 ? "blue-200" : "white"
            }  `}
          >
            <td className="text-center ">{index + 1}</td>
            <td className="text-center">{cut(`${user.username}`, 20)}</td>
            <td className="text-center">{user.role}</td>
            <td className="text-center">{cut(`${user.token}`, 20)}</td>

            <td className="text-center">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <div className="flex justify-center gap-2 px-1">
                <ViewUserAction user={user} />
                <EditUserAction id={user.id} />
                <RemoveUserAction id={user.id} pos={index + 1} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
