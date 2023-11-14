"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Menu = () => {
  const [datas, setData] = useState([
    {
      id: 1,
      name: "Employés",
      url: "/dashboard/employee",
      secure: false,
    },
    {
      id: 2,
      name: "Contrats",
      url: "/dashboard/contract",
      secure: false,
    },
    {
      id: 3,
      name: "Sanctions",
      url: "/dashboard/sanction",
      secure: false,
    },
    {
      id: 4,
      name: "Congés",
      url: "/dashboard/leave",
      secure: false,
    },
    {
      id: 5,
      name: "Bulletins de paie",
      url: "/dashboard/payslip",
      secure: false,
    },
    {
      id: 6,
      name: "Notification",
      url: "/dashboard/warning",
      secure: false,
    },
    {
      id: 7,
      name: "Utilisateur",
      url: "/dashboard/user",
      secure: false,
    },
  ]);
  const role = Cookies.get("role");
  const path = usePathname();

  useEffect(() => {
    if (role) {
      if (role === "ADMIN") {
        setData([...datas]);
      }
      if (role === "USER") {
        setData([...datas.filter((url) => url.id !== 7)]);
      }
    }
  }, [role]);
  return (
    <div className="mt-2 flex flex-col gap-2">
      {datas.map((data, id) => {
        if (data.secure === false) {
          return (
            <div
              className="bg-slate-100 rounded h-10 relative cursor-pointer"
              key={`menu--${id}`}
            >
              {path.search(data.url) !== -1 && (
                <div className="absolute top-1/2 -translate-y-1/2 h-7 rounded color-blue w-2 -left-1" />
              )}
              <Link
                href={data.url}
                className="w-full h-full pl-6 flex items-center"
              >
                {data.name}
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Menu;
