"use client";
import Logout from "../actionButton/Logout";
import { cut } from "@/helpers/helpers";
import Cookies from "js-cookie";

const Header = async () => {
  const username = Cookies.get("username") || "Utilisateur";
  return (
    <div className="flex gap-2 relative z-full">
      <h1 className="p-2 bg-amber-500 text-blue-700 w-20 h-full flex justify-center items-center fnt-bold text-3xl rounded">
        MH
      </h1>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-bold">{cut(username, 20)}</h2>
        <div className="flex items-end h-8 gap-2">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Header;
