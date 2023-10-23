import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <TailSpin
      height="30"
      width="30"
      color="#eee"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoaderSpinner;
