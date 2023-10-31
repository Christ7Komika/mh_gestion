"use client";
import Link from "next/link";
import { useState } from "react";
import { RxEyeOpen, RxEyeNone } from "react-icons/rx";

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-4 p-4">
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
        <Link
          className="w-full h-11 rounded color-blue mt-2 text-white cursor-pointer flex justify-center items-center"
          href="/dashboard/employee"
        >
          Se connecter
        </Link>
      </form>
      <div className="flex justify-between items-center p-4 gap-2 w-96 custum-shadow rounded-lg bg-white">
        <p className="text-red-400 text-sm">
          Oups !!! Vos identifiants sont invalides
        </p>
        <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" />
      </div>
    </main>
  );
}
