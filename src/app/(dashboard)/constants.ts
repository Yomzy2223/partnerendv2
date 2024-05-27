import { IRowInfo, ITableBody } from "@/components/tables/generalTable/constants";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { useGetAcceptedTasks } from "@/services/tasks";
import { countries, TCountryCode } from "countries-list";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent } from "react";

export const serviceQueryNav = [
  {
    name: "service-date-range",
    value: "weekly",
  },
  {
    name: "service-date-range",
    value: "monthly",
  },
  {
    name: "service-date-range",
    value: "yearly",
  },
];

export const serviceQueryNav2 = [
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

export const paymentQueryNav = [
  {
    name: "payment-date-range",
    value: "weekly",
  },
  {
    name: "payment-date-range",
    value: "monthly",
  },
  {
    name: "payment-date-range",
    value: "yearly",
  },
];

const cellClassName =
  "[&_span]:bg-success [&_span]:text-success-foreground [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md";

export const useTableInfo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setQueriesWithPath } = useGlobalFunctions();

  const session = useSession();
  const userId = session.data?.user?.id;

  const acceptedTasksRes = useGetAcceptedTasks({ userId });
  const acceptedTasks = acceptedTasksRes.data?.data?.data || [];

  const handleClick = (e: MouseEvent<HTMLTableRowElement>, rowId: string, rowInfo: IRowInfo[]) => {
    setQueriesWithPath({
      path: `/tasks/${rowId}`,
      queries: [{ name: "path", value: "ongoing" }],
    });
  };

  // Services table header
  const tableHeaders = ["S/N", "BUSINESS NAME", "SERVICE TYPE", "STATUS"];

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

  return {
    tableHeaders,
    tableBody,
    acceptedTasksRes,
  };
};

export const serviceTableNav = [
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
