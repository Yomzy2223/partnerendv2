import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TaskCardSkt = () => {
  return (
    <div className="flex flex-col gap-3 border border-border rounded p-4">
      <div className="flex justify-between gap-4">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-32 h-5" />
      </div>
      <div className="flex justify-between gap-4">
        <Skeleton className="w-36 h-6" />
        <Skeleton className="w-32 h-4" />
      </div>
      <div className="flex justify-between gap-4">
        <Skeleton className="w-28 h-9" />
        <Skeleton className="w-20 h-9" />
      </div>
    </div>
  );
};

export default TaskCardSkt;
