"use client";

import GeneralTable from "@/components/tables/generalTable";
import { useGetAcceptedTasks } from "@/services/tasks";
import { countries, TCountryCode } from "countries-list";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function OngoingTask() {
  const session = useSession();
  const userId = session.data?.user?.id;

  const router = useRouter();

  const acceptedTasksRes = useGetAcceptedTasks({ userId });
  const acceptedTasks = acceptedTasksRes.data?.data?.data || [];
  const totalTasks = acceptedTasksRes.data?.data?.total;

  const handleClick = (e: MouseEvent<HTMLTableRowElement>, rowId: string) => {
    console.log(rowId);
    router.push(`/tasks/${rowId}`);
  };

  const tableBody = acceptedTasks?.map((task, i) => {
    const originalCountry = Object.keys(countries)
      .map((el: string) => countries[el as TCountryCode].name)
      .find((el) => el.toLowerCase() === task.productCountry?.toLowerCase());

    return {
      rowId: task.id,
      handleClick,
      rowInfo: [
        {
          text: i.toString().padStart(2, "0"),
        },
        { text: task?.serviceName || "" },
        { text: task?.productName || "" },
        { text: originalCountry || "" },
        { text: format(task?.assignedAt, "dd MMM, yyy") },
      ],
    };
  });

  return (
    <div className="my-6 py-4 border rounded border-border flex flex-col gap-8">
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        itemsLength={totalTasks || 0}
        itemsPerPage={10}
        dataLoading={acceptedTasksRes.isLoading}
        hideHeader
      />
    </div>
  );
}

// table header
const tableHeaders = ["S/N", "SERVICE NAME", "PRODUCT NAME", "COUNTRY", "ASSIGNED"];
