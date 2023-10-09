import React from "react";

interface Props {
  label?: string;
  data: string[];
}

const Select = ({ data, label }: Props) => {
  return (
    <select className="rounded  bg-slate-100 outline-slate-300 outline-2 text-slate-600 px-1 text-sm">
      <option className="text-slate-500 text-sm select" value="inconnu">
        {label ? label : "Choisir une option"}
      </option>
      {data.map((option) => (
        <option
          className="text-slate-500 text-sm"
          value={option.toLowerCase()}
          key={option.toLowerCase()}
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
