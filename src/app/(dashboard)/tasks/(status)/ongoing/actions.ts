import { IRowInfo } from "@/components/tables/generalTable/constants";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import {
  useGetAcceptedTasks,
  useGetRequestBusinessQuery,
  useGetRequestQAFormsQuery,
} from "@/services/tasks";
import { countries, TCountryCode } from "countries-list";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export const useActions = ({
  userId,
  preview,
  setPreview,
}: {
  userId: string;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
}) => {
  const { isDesktop } = useGlobalFunctions();

  const router = useRouter();

  const acceptedTasksRes = useGetAcceptedTasks({ userId });
  const acceptedTasks = acceptedTasksRes.data?.data?.data || [];

  const requestQAFormsRes = useGetRequestQAFormsQuery({ requestId: preview });

  const requestBusinessRes = useGetRequestBusinessQuery({ requestId: preview });
  const requestBusiness = requestBusinessRes.data?.data?.data?.[0];

  const handleClick = (e: MouseEvent<HTMLTableRowElement>, rowId: string, rowInfo: IRowInfo[]) => {
    isDesktop ? setPreview(rowId) : router.push(`/services/requests/${rowId}`);
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

  return {
    tableBody,
    requestQAFormsRes,
    acceptedTasksRes,
    requestBusiness,
  };
};
