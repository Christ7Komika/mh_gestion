"use client";
import { useRouter } from "next/navigation";

const ViewEmployee = () => {
  const route = useRouter();
  return (
    <span
      className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
      onClick={() => route.push("/dashboard/employee/1")}
    />
  );
};

export default ViewEmployee;
