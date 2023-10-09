import React from "react";

interface Props {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<File | null>>;
}

const InputFile = ({ label, setValue }: Props) => {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <label className="text-slate-500 text-sm" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <input
        className=" bg-slate-100 h-9 outline-slate-300 outline-2 w-full px-2 rounded text-slate-500 text-sm p-1.5"
        type="file"
        id={label.toLowerCase()}
        onChange={(e) => setValue((e.target.files as FileList)[0])}
      />
    </div>
  );
};

export default InputFile;
