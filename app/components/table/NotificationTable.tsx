import { ElementStatus } from "@/app/api/notification/route";
import { dateDelay, isExpired } from "@/lib/helpers";
import React from "react";
import State from "../state/State";

interface Props {
  notifications: ElementStatus[];
}

const NotificationTable = ({ notifications }: Props) => {
  return (
    <table className=" table-auto w-full border-spacing-2 bg-slate-100 ">
      <thead className="bg-white h-14 rounded text-slate-600 font-normal">
        <tr>
          <th className="align-middle">ID</th>
          <th className="align-middle w-32">Nom</th>
          <th className="align-middle w-32">type</th>
          <th className="align-middle w-32">Status</th>
          <th className="align-middle w-32">Duree</th>
          <th className="align-middle w-32">Date début</th>
          <th className="align-middle w-32">Date fin</th>
          <th className="align-middle">Option</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map((notification, index) => (
          <tr
            className={`h-12 text-gray-700 text-sm bg-${
              index % 2 === 0 ? "blue-200" : "white"
            }  `}
          >
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{notification.employee}</td>
            <td className="text-center">{notification.section}</td>
            <td className="text-center">
              <State
                color={isExpired(notification.endDate) ? "red" : "emerald"}
                label={
                  notification.endDate &&
                  dateDelay(new Date(), new Date(notification.endDate))
                }
              />
            </td>
            <td className="text-center">{notification.delay}</td>
            <td className="text-center">
              {notification.startDate
                ? new Date(notification.startDate).toLocaleDateString()
                : "-"}
            </td>
            <td className="text-center">
              {new Date(notification.endDate).toLocaleDateString()}
            </td>
            <td className="text-center">
              {notification.file ? (
                <a
                  target="_blank"
                  href={"/upload/" + notification.file}
                  className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer mx-auto"
                ></a>
              ) : (
                "-"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotificationTable;
