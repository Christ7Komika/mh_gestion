"use client";
import React from "react";
import LoaderSpinner from "../components/loader/LoaderSpinner";

export default function loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center">
      <LoaderSpinner w={50} h={50} color="#222" />
    </div>
  );
}
