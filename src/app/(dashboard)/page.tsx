"use client";
import { PaymentAnalyticsImg } from "@/assets/svg";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import ServiceSummaryCard from "@/components/cards/profileSummaryCard";
import DoChecks from "@/components/DoChecks";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import GeneralTable from "@/components/tables/generalTable";
import { TaskCard } from "@/components/TaskCard";
import CardWrapper from "@/components/wrappers/cardWrapper";
import Image from "next/image";
import React from "react";
import { paymentQueryNav, useTableInfo } from "./constants";
import { useSession } from "next-auth/react";

const Home = () => {
  const { tableHeaders, tableBody } = useTableInfo();

  const pendingTaskLength = 0;

  const { data: session } = useSession();
  return (
    <DoChecks
      items={["d"]}
      emptyText="You have not added any product"
      className="grid grid-cols-2 gap-8"
    >
      <div className="flex flex-nowrap gap-8 flex-1 overflow-auto px-1 py-2 lg:grid lg:grid-cols-2">
        <ServiceSummaryCard
          title={session?.user.fullName}
          info="Joined Sidebrief on the 13th of February 2023."
        />
        <AnalyticsCard3 title="Total Tasks Done" total="0" current={244} previous={87} />
        <AnalyticsCard3
          title="Pending tasks"
          total={pendingTaskLength ? "0" : "0"}
          current={pendingTaskLength ? 0 : 0}
          previous={pendingTaskLength ? 0 : 0}
        />
        <AnalyticsCard3 title="Amount Earned" total="0" current={244} previous={87} />
      </div>
      <CardWrapper className="my-2 flex-1 p-0">
        <div className="flex gap-4 flex-wrap px-4 pb-4">
          {Array(1)
            .fill("")
            .map((el, i) => (
              <TaskCard
                key={i}
                businessName="Nil"
                countryCode="ng"
                countryName="Nigeria"
                // servicename="Business"
              />
            ))}
        </div>
      </CardWrapper>

      <CardWrapper className="p-0">
        <GeneralTable tableHeaders={tableHeaders} tableBody={tableBody} hideHeader />
      </CardWrapper>
      <CardWrapper>
        <AnalyticsHeader
          title="Payment analytics"
          description="Total revenue for registrations"
          queryNav={paymentQueryNav}
        />
        <Image src={PaymentAnalyticsImg} alt="payment analytics" />
      </CardWrapper>
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
