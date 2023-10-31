interface Props {
  color: string;
  label: string;
}

const State = ({ label, color }: Props) => {
  return (
    <div
      className={`px-3 py-2 rounded-full flex justify-center items-center  ${
        color === "red" ? "bg-red-200" : "bg-emerald-300"
      }`}
    >
      <p
        className={`text-sm  ${
          color === "red" ? "text-red-700" : "text-emerald-700"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default State;
