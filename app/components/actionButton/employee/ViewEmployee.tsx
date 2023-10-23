"use client";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

const ViewEmployee = ({ id }: Props) => {
  const route = useRouter();
  return (
    <span
      className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
      onClick={() => route.push("/dashboard/employee/" + id)}
    />
  );
};

export default ViewEmployee;
