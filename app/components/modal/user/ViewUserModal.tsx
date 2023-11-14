"use client";
import { User } from "@/app/dashboard/user/page";
import { use, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

const ViewUserModal = ({ handleClose, user }: Props) => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setPassword(user.password);
  }, []);

  useEffect(() => {
    if (user) {
      if (show) {
        const payload = jwt.decode(user.token, {
          complete: true,
        })?.payload;
        setPassword(payload as string);
        return;
      }
      setPassword(user.token);
    }
  }, [show]);
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25">
      <div className="w-auto max-w-[500px] rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-500 font-bold text-xl uppercase">
            Infos congé
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          {user.username && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Nom de l'utilisateur
              </h2>
              <span className="text-slate-500 text-md ">{`${user.username}`}</span>
            </div>
          )}
          {user.password && (
            <div className="w-full flex flex-col flex-wrap gap-2 bg-slate-50 rounded p-2 items-start">
              <h2 className="text-slate-500 font-bold text-left text-base uppercase">
                Mot de passe
              </h2>
              <p
                className="text-slate-500 text-md text-left w-auto break-all inline-block
              "
              >
                {`${password}`}
                <span
                  onClick={() => setShow(!show)}
                  className="w-6 h-6 rounded-full bg-slate-400 flex justify-center items-center  cursor-pointer"
                >
                  {show ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                </span>
              </p>
            </div>
          )}
          {user.role && (
            <div className="w-full flex gap-2 bg-slate-50 rounded p-2 items-end">
              <h2 className="text-slate-500 font-bold text-base uppercase">
                Role
              </h2>
              <span className="text-slate-500 text-md ">{`${user.role}`}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
