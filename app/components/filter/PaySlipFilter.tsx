"use client";
import { useState } from "react";
import Search from "../input/Search";
import Select from "../input/Select";
import InputDateTime from "../input/InputDateTime";

const PaySlipFilter = () => {
  const [date, setDate] = useState<string>("");
  return (
    <div className="w-full flex gap-2">
      <Search />
      <Select data={status} />
      <InputDateTime setValue={setDate} value={date} label="" />
    </div>
  );
};

const status = ["Non payé", "Payé"];

export default PaySlipFilter;
