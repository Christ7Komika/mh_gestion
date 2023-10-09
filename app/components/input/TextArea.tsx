import React from "react";

interface Props {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const TextArea = ({ label, setValue, value }: Props) => {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <label className="text-slate-500 text-sm" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <textarea
        className=" bg-slate-100  outline-slate-300 outline-2 p-2 rounded text-slate-500 text-sm w-full h-16"
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default TextArea;
