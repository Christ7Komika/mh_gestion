import React from "react";

interface Props {
  name: string;
  value: number;
}

const Card = ({ name, value }: Props) => {
  return (
    <div className="h-24 p-4 flex flex-col gap-2 items-center justify-center bg-white rounded border border-slate-200 shadow-sm">
      <p className="text-slate-500 font-medium uppercase">{name}</p>
      <small className=" text-gray-500 text-md px-8 py-1 rounded-full bg-slate-200">
        {value}
      </small>
    </div>
  );
};

export default Card;
