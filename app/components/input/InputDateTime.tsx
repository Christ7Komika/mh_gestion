import React from "react";

interface Props {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const InputDateTime = ({ label, setValue, value }: Props) => {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <label className="text-slate-500 text-sm" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <input
        className=" bg-slate-100 h-9 outline-slate-300 outline-2 w-full px-2 rounded text-slate-500 text-sm"
        type="date"
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputDateTime;
