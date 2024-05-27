import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import { TGetTasks } from "@/services/tasks/types";
import { isSameMonth, subMonths } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import { ResponsiveContainer, Line, LineChart } from "recharts";
import { useActions } from "./actions";

const PartnerLineChart = ({
  title,
  rangeData,
  isLoading,
  errMsg,
  className,
}: {
  title: string;
  rangeData: TGetTasks[];
  isLoading: boolean;
  errMsg: string;
  className?: string;
}) => {
  const currMonth =
    rangeData?.filter((el) => isSameMonth(new Date(el.createdAt), new Date()))?.length || 0;
  const prevMonth =
    rangeData?.filter((el) => isSameMonth(new Date(el.createdAt), subMonths(new Date(), 1)))
      ?.length || 0;

  let perc = ((currMonth - prevMonth) / (prevMonth || 1)) * 100;
  perc = parseFloat(perc.toFixed(2));

  const decreased = perc < 0;

  const { getRangeData } = useActions({ rangeData });

  const rangeChartData: IDayData[] = getRangeData();

  // Returns the data to be passed to the chart
  const data = rangeChartData.map((el, i) => {
    return {
      date: rangeChartData[i].dayDate,
      current: rangeChartData?.[i]?.dayData?.length || 0,
    };
  });

  return (
    <CardWrapper
      className={cn("flex flex-col justify-between w-full min-w-[200px] max-w-[300px]", className)}
    >
      <p className="text-sm text-foreground-5 mb-3">{title}</p>
      <div className="flex justify-between gap-4 mb-6">
        <p className="sb-text-24 font-semibold">{currMonth}</p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={data}>
            <Line type="monotone" dataKey="current" stroke="#84d885" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1 text-sm text-foreground-5 font-normal">
        <div className="flex items-center">
          <span>
            {decreased ? (
              <ArrowDown size={14} color="hsl(var(--destructive-foreground))" />
            ) : (
              <ArrowUp size={14} color="hsl(var(--success-foreground))" />
            )}
          </span>
          <span
            className={cn({
              "text-success-foreground": !decreased,
              "text-destructive-foreground": decreased,
            })}
          >
            {perc + "%"}
          </span>
        </div>
        <span>vs last month</span>
      </div>
    </CardWrapper>
  );
};

export default PartnerLineChart;

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface IProps {
  dateFrom?: Date;
  dateTo?: Date;
  activeServiceId?: string;
}

interface IDayData {
  dayDate: string;
  dayData: any[];
}
