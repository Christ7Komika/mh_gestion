"use client";
import { CgLogOut } from "react-icons/cg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderSpinner from "../loader/LoaderSpinner";
const Logout = () => {
  const [isLoad, setIsLoad] = useState(false);
  const route = useRouter();
  const signOut = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoad(true);
    Cookies.remove("isAuth");
    Cookies.remove("role");
    Cookies.remove("username");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    route.push("/");
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
