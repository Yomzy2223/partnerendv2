"use client";

import { PaymentAnalyticsImg } from "@/assets/svg";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import { TaskCard } from "@/components/cards/TaskCard";
import TaskCardSkt from "@/components/cards/TaskCard/taskCardSkt";
import DoChecks from "@/components/DoChecks";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { useGetAcceptedTasks, useGetAssignedTasks, useGetCompletedTasks } from "@/services/tasks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { paymentQueryNav, useTableInfo } from "./constants";

const Page = () => {
  const { tableHeaders, tableBody, acceptedTasksRes } = useTableInfo();
  const session = useSession();
  const user = session.data?.user;
  const name = user?.fullName;
  // let date = session.data?.user?.createdAt;
  // const date = new Date("2024 04 23");
  // const formatedDate = isValid(date) ? format(date, "ddd mmm, yyyy") : "-- --";
  // console.log(format(formatedDate, "ddd mmm, yyyy"));

  const completedTasksRes = useGetCompletedTasks({ userId: user?.id });
  const completedTasks = completedTasksRes.data?.data?.data;

  const pendingTasksRes = useGetAcceptedTasks({ userId: user?.id });
  const pendingTasks = pendingTasksRes.data?.data?.data;

  const assignedTasksRes = useGetAssignedTasks({ userId: user?.id });
  const assignedTasks = assignedTasksRes.data?.data?.data || [];

  const totalTasks = acceptedTasksRes.data?.data?.total;

  return (
    <DoChecks
      items={["d"]}
      emptyText="You have not added any product"
      className="grid grid-cols-2 gap-8"
    >
      <div className="flex flex-nowrap gap-8 flex-1 overflow-auto px-1 py-2 lg:grid lg:grid-cols-2">
        <CardWrapper className="flex flex-col justify-between gap-4 bg-primary-8 rounded-lg w-full min-w-[200px] max-w-[300px] h-[158px]">
          <div>
            <p className="sb-text-24 font-semibold mb-2">{name || "--"}</p>
            <p className="text-sm font-normal text-foreground-5">
              Joined Sidebrief on the 23rd April, 2024
            </p>
          </div>
        </CardWrapper>
        <AnalyticsCard3
          title="Total Tasks Done"
          total={completedTasks?.length || 0}
          current={244}
          previous={87}
        />
        <AnalyticsCard3
          title="Pending tasks"
          total={pendingTasks?.length || 0}
          current={0}
          previous={0}
        />
        <AnalyticsCard3 title="Amount Earned" total="0" current={244} previous={87} />
      </div>
      <CardWrapper className="my-2 flex-1 p-0">
        <div className="flex gap-4 flex-wrap px-4 pb-4">
          <DoChecks
            items={assignedTasks}
            emptyText="You currently have no tasks assigned"
            isLoading={assignedTasksRes.isLoading}
            className="grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] gap-y-6 gap-x-4"
            errorText={assignedTasksRes.error?.message}
            textClassName="!sb-text-16"
            Skeleton={[1, 2].map((el) => (
              <TaskCardSkt key={el} />
            ))}
          >
            {assignedTasks?.slice(0, 2)?.map((task) => (
              <div key={task.id}>
                <TaskCard info={task} userId={user?.id} />
              </div>
            ))}
          </DoChecks>
        </div>
      </CardWrapper>
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        itemsLength={totalTasks || 0}
        itemsPerPage={10}
        dataLoading={acceptedTasksRes.isLoading}
        errorMsg={acceptedTasksRes.error?.message}
        emptyTextClassName="!sb-text-16"
        hideHeader
      />
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

export default Page;

// import React from "react";

// const Page = () => {
//   return <div>Page</div>;
// };

// export default Page;
const tableHeaders = ["S/N", "SERVICE NAME", "PRODUCT NAME", "COUNTRY", "ASSIGNED"];
