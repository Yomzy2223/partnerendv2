"use client";

// import PartnerAreaChart from "@/components/cards/analytics/partnerAreaChart";
// import PartnerLineChart from "@/components/cards/analytics/partnerLineChart";
// import { TaskCard } from "@/components/cards/TaskCard";
// import TaskCardSkt from "@/components/cards/TaskCard/taskCardSkt";
// import DoChecks from "@/components/DoChecks";
// import GeneralTable from "@/components/tables/generalTable";
// import CardWrapper from "@/components/wrappers/cardWrapper";
// import { useGetAcceptedTasks, useGetAssignedTasks, useGetCompletedTasks } from "@/services/tasks";
// import { useSession } from "next-auth/react";
import React from "react";
// import { useTableInfo } from "./constants";
import Dashboard from "./dashboard";

const Page = () => {
  // const { tableHeaders, tableBody, acceptedTasksRes } = useTableInfo();
  // const session = useSession();
  // const user = session.data?.user;
  // const name = user?.fullName;
  // // let date = session.data?.user?.createdAt;
  // // const date = new Date("2024 04 23");
  // // const formatedDate = isValid(date) ? format(date, "ddd mmm, yyyy") : "-- --";
  // // console.log(format(formatedDate, "ddd mmm, yyyy"));

  // const completedTasksRes = useGetCompletedTasks({ userId: user?.id });
  // const completedTasks = completedTasksRes.data?.data?.data;

  // const pendingTasksRes = useGetAcceptedTasks({ userId: user?.id });
  // const pendingTasks = pendingTasksRes.data?.data?.data;

  // const assignedTasksRes = useGetAssignedTasks({ userId: user?.id });
  // const assignedTasks = assignedTasksRes.data?.data?.data || [];

  // const totalTasks = acceptedTasksRes.data?.data?.total;

  // return (
  //   <div className="grid grid-cols-2 gap-8">
  //     <div className="flex flex-nowrap gap-8 flex-1 overflow-auto px-1 py-2 lg:grid lg:grid-cols-2">
  //       <CardWrapper className="flex flex-col justify-between gap-4 bg-primary-8 rounded-lg w-full min-w-[200px] max-w-[300px] h-[158px]">
  //         <div>
  //           <p className="sb-text-24 font-semibold mb-2">{name || "--"}</p>
  //           <p className="text-sm font-normal text-foreground-5">
  //             Joined Sidebrief on the 23rd April, 2024
  //           </p>
  //         </div>
  //       </CardWrapper>
  //       <PartnerLineChart
  //         title="Completed tasks"
  //         rangeData={completedTasks || []}
  //         isLoading={completedTasksRes.isLoading}
  //         errMsg={completedTasksRes.error?.message as string}
  //       />
  //       <PartnerLineChart
  //         title="Inprogress tasks"
  //         rangeData={pendingTasks || []}
  //         isLoading={pendingTasksRes.isLoading}
  //         errMsg={pendingTasksRes.error?.message as string}
  //       />
  //       <PartnerLineChart
  //         title="Pending tasks"
  //         rangeData={assignedTasks || []}
  //         isLoading={assignedTasksRes.isLoading}
  //         errMsg={assignedTasksRes.error?.message as string}
  //       />
  //     </div>
  //     <CardWrapper className="my-2 flex-1 p-0">
  //       <div className="flex gap-4 flex-wrap px-4 pb-4">
  //         <DoChecks
  //           items={assignedTasks}
  //           emptyText="You currently have no tasks assigned"
  //           isLoading={assignedTasksRes.isLoading}
  //           className="grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] gap-y-6 gap-x-4"
  //           errorText={assignedTasksRes.error?.message}
  //           textClassName="!sb-text-16"
  //           Skeleton={[1, 2].map((el) => (
  //             <TaskCardSkt key={el} />
  //           ))}
  //         >
  //           {assignedTasks?.slice(0, 2)?.map((task) => (
  //             <div key={task.id}>
  //               <TaskCard info={task} userId={user?.id} />
  //             </div>
  //           ))}
  //         </DoChecks>
  //       </div>
  //     </CardWrapper>
  //     <GeneralTable
  //       tableHeaders={tableHeaders}
  //       tableBody={tableBody}
  //       itemsLength={totalTasks || 0}
  //       itemsPerPage={10}
  //       dataLoading={acceptedTasksRes.isLoading}
  //       errorMsg={acceptedTasksRes.error?.message}
  //       emptyTextClassName="!sb-text-16"
  //       hideHeader
  //     />

  //     <PartnerAreaChart
  //       title="Completed tasks"
  //       rangeData={completedTasks || []}
  //       isLoading={completedTasksRes.isLoading}
  //       errMsg={completedTasksRes.error?.message as string}
  //     />
  //   </div>
  // );
  return <Dashboard />;
};

export default Page;
