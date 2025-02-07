import { Chart3 } from "@/assets/images";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const AnalyticsCard3 = ({
  title,
  previous,
  current,
  total,
  bottomText,
  className,
}: {
  title: string;
  previous: number;
  current: number;
  total: string | number;
  bottomText?: string;
  className?: string;
}) => {
  let perc = ((current - previous) / (previous || 1)) * 100;
  perc = parseFloat(perc.toFixed(2));

  // let perc = 100 * difference || 0;
  const decreased = perc < 0;

  return (
    <CardWrapper
      className={cn("flex flex-col justify-between w-full min-w-[200px] max-w-[300px]", className)}
    >
      <p className="text-sm text-foreground-5 mb-3">{title}</p>
      <div className="flex justify-between gap-4 mb-6">
        <p className="sb-text-24 font-semibold">{total}</p>
        <Image src={Chart3} alt="analytics chart" />
      </div>

      <div className="flex items-center text-sm text-foreground-5 font-normal">
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
        {" " + ("vs last month" || bottomText)}
      </div>
    </CardWrapper>
  );
};

export default AnalyticsCard3;
