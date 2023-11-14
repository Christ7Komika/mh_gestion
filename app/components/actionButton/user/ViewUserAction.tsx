"use client";
import { useState } from "react";
import { User } from "@/app/dashboard/user/page";
import ViewUserModal from "../../modal/user/ViewUserModal";

type Props = { user: User };

const ViewUserAction = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <ViewUserModal handleClose={setOpen} user={user} />}
      <span
        className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default ViewUserAction;
