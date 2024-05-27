import { addDays, compareAsc, differenceInDays, format, isSameDay, subDays } from "date-fns";
import { TGetTasks } from "@/services/tasks/types";
import { useGetCompletedTasks } from "@/services/tasks";

export const useActions = ({ rangeData }: { rangeData: TGetTasks[] }) => {
  const sortedReqs = rangeData?.sort((a, b) => compareAsc(a?.createdAt, b?.createdAt)) || [];
  const firstDate = new Date(sortedReqs?.[0]?.createdAt);
  const lastDate = new Date(sortedReqs?.[sortedReqs?.length - 1]?.createdAt);
  const daysDiff = firstDate && lastDate ? differenceInDays(lastDate, firstDate) + 1 : 0;

  // Returns the data for each day
  const getDayData = (inc: number) => {
    const dayDate = addDays(firstDate, inc);
    if (dayDate) {
      const dayData = sortedReqs?.filter((el) => isSameDay(new Date(el.createdAt), dayDate));
      return {
        dayDate: format(dayDate, "MMMM dd"),
        dayData,
      };
    }
  };

  // Returns the data for selected range, if isCompare is true. Returns for compare range, if otherwise
  const getRangeData = () => {
    let rangeData: any[] = [];
    for (let i = 0; i < daysDiff; i++) {
      const dayData = getDayData(i);
      rangeData = [...rangeData, dayData];
    }
    return rangeData;
  };

  return { getDayData, getRangeData };
};
