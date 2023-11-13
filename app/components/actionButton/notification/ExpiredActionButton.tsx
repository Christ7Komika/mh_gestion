"use client";
import { useState } from "react";
import { IoMdWarning } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function ExpiredActionButton() {
  const [open, setOpen] = useState(false);
  const route = useRouter();
  return (
    <>
      <div
        className="flex justify-center items-center w-6 h-6 rounded-full bg-red-400 text-white cursor-pointer"
        onClick={() => route.push("/dashboard/warning")}
      >
        <IoMdWarning size={15} />
      </div>
    </>
  );
}
