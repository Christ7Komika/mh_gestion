"use client";
import React, { useEffect, useState } from "react";

interface Props {
  label?: string;
  data: string[];
  selected?: React.Dispatch<React.SetStateAction<string>>;
}

const Select = ({ data, label, selected }: Props) => {
  const [select, setSelect] = useState("");

  useEffect(() => {
    if (selected) {
      selected(select);
    }
  }, [select]);
  return (
    <select
      className="rounded  bg-slate-100 outline-slate-300 outline-2 text-slate-600 px-1 text-sm"
      onChange={(e) => setSelect(e.target.value)}
      value={select}
    >
      <option className="text-slate-500 text-sm select" value="all">
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
