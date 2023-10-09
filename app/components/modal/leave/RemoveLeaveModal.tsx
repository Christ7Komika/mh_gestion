"use client";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemoveLeaveModal = ({ handleClose }: Props) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25">
      <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-end items-center">
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex h-8 items-center">
          <h2 className="text-slate-500 font-medium text-md">
            Voulez vous vraiment supprimer cette donnée
          </h2>
        </div>

        <div className="flex justify-end">
          <button className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveLeaveModal;
