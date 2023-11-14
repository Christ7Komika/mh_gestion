"use client";
import { useState } from "react";
import { RxEyeOpen, RxEyeNone } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { host } from "@/lib/host";
import { useRouter } from "next/navigation";
import LoaderSpinner from "./components/loader/LoaderSpinner";
import Cookies from "js-cookie";
export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const route = useRouter();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error("Veuillez remplir tous les champs");
    }
    setIsLoad(true);
    const res = await fetch(`${host}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const user = await res.json();

      console.log({ user });

      Cookies.set("isAuth", "1");
      Cookies.set("role", user.role);
      Cookies.set("username", user.username);
      toast.success("Vous allez être redirigé dans quelque instant");
      console.log({
        username: user.username,
        role: user.role,
      });
      console.log({
        username1: Cookies.get("username"),
      });

      route.push("/dashboard/employee");
      setIsLoad(false);
      return;
    }

    toast.error("Vos identifiants sont invalides");
    setIsLoad(false);
    return;
  };
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-4 p-4">
      <Toaster />
      <h1 className="bg-amber-500 p-5 text-blue-900 text-5xl font-bold">MH</h1>
      <p className="w-72 text-center">
        Connectez afin de pouvoir débuter votre travail
      </p>
      <form className="flex flex-col bg-white w-96 p-4 gap-2 custum-shadow rounded-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="user" className="text-sm">
            Identifiant
          </label>
          <input
            type="text"
            id="user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-slate-200 h-9 rounded pl-2 text-sm outline-slate-200 outline-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm">
            Mot de passe
          </label>
          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full border border-slate-200 h-9 rounded pl-2 text-sm outline-slate-200 outline-4"
            />
            <span
              className="absolute top-2/4 right-2 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-3xl flex justify-center items-center cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <RxEyeNone size={15} /> : <RxEyeOpen size={15} />}
            </span>
          </div>
        </div>
        <button
          className="w-full h-11 rounded color-blue mt-2 text-white cursor-pointer flex justify-center items-center"
          onClick={handleLogin}
        >
          {isLoad ? <LoaderSpinner w={15} h={15} /> : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
