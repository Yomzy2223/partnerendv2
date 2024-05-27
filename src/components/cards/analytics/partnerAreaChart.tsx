import DoChecks from "@/components/DoChecks";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { TGetTasks } from "@/services/tasks/types";
import { TUser } from "@/services/users/types";
import { format, isSameDay, setYear, subDays } from "date-fns";
import React from "react";
import {
  ResponsiveContainer,
  Line,
  LineChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useActions } from "./actions";

const PartnerAreaChart = ({
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
    <CardWrapper big className="flex flex-col max-w-[634px] w-full">
      <p className="sb-text-20 font-semibold mb-1 lowercase first-letter:uppercase">{title}</p>
      <DoChecks
        items={rangeData}
        emptyText="You currently have no completed tasks"
        isLoading={isLoading}
        className="min-h-64 h-full"
        errorText={errMsg}
        textClassName="!sb-text-16"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={data}>
            <Line type="monotone" dataKey="current" stroke="#84d885" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: -30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" axisLine={false} />
            <YAxis axisLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="current" fill="#bdccdb" />
          </BarChart>
        </ResponsiveContainer>
      </DoChecks>
    </CardWrapper>
  );
};

export default PartnerAreaChart;

// CUSTOMIZED TOOLTIP
const CustomTooltip = (props: any) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="bg-background opacity-90 px-2 py-1 border border-border rounded shadow-sm">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

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
