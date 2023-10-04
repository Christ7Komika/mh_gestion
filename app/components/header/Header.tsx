import { CgLogOut } from "react-icons/cg";
import { IoIosNotifications, IoMdWarning } from "react-icons/io";

const Header = () => {
  return (
    <div className="flex gap-2">
      <h1 className="p-2 bg-amber-500 text-blue-700 w-20 h-full flex justify-center items-center font-bold text-3xl rounded">
        MH
      </h1>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-bold">KOMIKA Christ...</h2>
        <p className="text-sm">Information</p>
        <div className="flex items-end h-8 gap-2">
          <button className="bg-red-500 text-white h-full w-12 rounded flex justify-center items-center">
            <CgLogOut size={20} />
          </button>
          <div className="flex justify-center items-center w-6 h-6 rounded-full bg-amber-400 text-white">
            <IoIosNotifications size={15} />
          </div>
          <div className="flex justify-center items-center w-6 h-6 rounded-full bg-red-400 text-white">
            <IoMdWarning size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
