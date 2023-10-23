import React from "react";

interface Props {
  data: string[];
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const SelectLabel = ({ data, label, value, setValue }: Props) => {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <label className="text-slate-500 text-sm" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <select
        className=" bg-slate-100 h-9 outline-slate-300 outline-2 w-full px-2 rounded text-slate-500 text-sm"
        id={label.toLocaleLowerCase()}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <option className="text-slate-500 text-sm" value={"inconnu"}>
          Selectionner une option
        </option>
        {data.map((option) => (
          <option
            className="text-slate-500 text-sm"
            value={option}
            key={option.toLowerCase()}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLabel;
