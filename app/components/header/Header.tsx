import { CgLogOut } from "react-icons/cg";

const Header = async () => {
  return (
    <div className="flex gap-2 relative z-full">
      <h1 className="p-2 bg-amber-500 text-blue-700 w-20 h-full flex justify-center items-center fnt-bold text-3xl rounded">
        MH
      </h1>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-bold">KOMIKA Christ...</h2>
        <p className="text-sm">Information</p>
        <div className="flex items-end h-8 gap-2">
          <button className="bg-red-500 text-white h-full w-12 rounded flex justify-center items-center">
            <CgLogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
