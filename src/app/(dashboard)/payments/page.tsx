"use client";

import React from "react";
import GeneralTable from "@/components/tables/generalTable";
import { serviceTableNav, useTableInfo } from "./constants";

const Payments = () => {
  const { tableHeaders, tableBody } = useTableInfo();

  return (
    <div>
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        serviceTableNav={serviceTableNav}
      />
    </div>
  );
};

export default Payments;
