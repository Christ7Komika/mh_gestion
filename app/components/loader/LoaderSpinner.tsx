import React from "react";
import { TailSpin } from "react-loader-spinner";

interface Props {
  w?: number;
  h?: number;
  color?: string;
}

const LoaderSpinner = ({ w, h, color }: Props) => {
  return (
    <TailSpin
      height={h || 30}
      width={w || 30}
      color={color || "#eee"}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoaderSpinner;
