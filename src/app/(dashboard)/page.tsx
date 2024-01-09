"use client";

import { PaymentAnalyticsImg, PaymentAnalyticsImg2 } from "@/assets/svg";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import ServiceSummaryCard from "@/components/cards/profileSummaryCard";
import DoChecks from "@/components/DoChecks";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { Button } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { paymentQueryNav, useTableInfo } from "./constants";

const Home = () => {
  const { tableHeaders, tableBody } = useTableInfo();

  return (
    <DoChecks items={["d"]} emptyText="You have not added any product">
      <div className="flex flex-col gap-8 pt-4 pb-6 lg:flex-row ">
        <div className="flex flex-nowrap gap-8 flex-1 overflow-auto px-1 py-2 lg:w-1/2 lg:grid lg:grid-cols-2">
          <ServiceSummaryCard
            title="Samuel Olajide"
            info="Joined Sidebrief on the 13th of February 2023."
          />
          <AnalyticsCard3
            title="Completed requests"
            total="0"
            current={244}
            previous={87}
          />
          <AnalyticsCard3
            title="Completed requests"
            total="0"
            current={24}
            previous={87}
          />
          <AnalyticsCard3
            title="Completed requests"
            total="0"
            current={244}
            previous={87}
          />
        </div>
        <CardWrapper
          title="Newly added tasks"
          className="gap-6 justify-between my-2 flex-1 p-0"
        >
          hello
        </CardWrapper>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <CardWrapper className="p-0" title="Ongoing tasks">
          <GeneralTable
            tableHeaders={tableHeaders}
            tableBody={tableBody}
            hideSearch
            // serviceTableNav={serviceTableNav}
          />
        </CardWrapper>
        <CardWrapper>
          <AnalyticsHeader
            title="Payment analytics"
            description="Total revenue for registrations"
            queryNav={paymentQueryNav}
          />
          <Image src={PaymentAnalyticsImg} alt="payment analytics" />
        </CardWrapper>
      </div>
    </DoChecks>
  );
};

export default Home;

const serviceTableNav = [
  {
    name: "service",
    value: "onboard",
  },
  {
    name: "service",
    value: "launch",
  },
  {
    name: "service",
    value: "manage",
  },
  {
    name: "service",
    value: "tax",
  },
];
