"use client";
import DoChecks from "@/components/DoChecks";
import React from "react";
import GeneralTable from "@/components/tables/generalTable";
import { serviceTableNav, useTableInfo } from "./constants";
import { EmptyContentSvg } from "@/assets/svg";
import Image from "next/image";
const Payments = () => {
  const { tableHeaders, tableBody } = useTableInfo();

  return (
    <div className="flex justify-center items-center">
      <div className="m-auto w-max my-10">
        <Image src={EmptyContentSvg} alt="empty" className="m-auto" />
        <p className="sb-text-20 text-center">No Payment Information found</p>
      </div>
  </div>
  );
};

export default Payments;
