"use client";

import { CgLogOut } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderSpinner from "../loader/LoaderSpinner";
import { host } from "@/lib/host";
import Cookies from "js-cookie";

const Logout = () => {
  const [isLoad, setIsLoad] = useState(false);
  const username = Cookies.get("username");
  const route = useRouter();
  const signOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoad(true);
    const res = await fetch(`${host}/user/logout/${username}`, {
      method: "GET",
      redirect: "follow",
    });
    if (res.ok) {
      Cookies.remove("isAuth");
      Cookies.remove("role");
      Cookies.remove("username");
      route.push("/");
      setIsLoad(false);
      return;
    }
    setIsLoad(false);
    return;
  };

  return (
    <button
      className="bg-red-500 text-white h-full w-12 rounded flex justify-center items-center"
      onClick={(e) => signOut(e)}
    >
      {isLoad ? <LoaderSpinner w={20} h={20} /> : <CgLogOut size={20} />}
    </button>
  );
};

export default Logout;
