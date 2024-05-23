"use client";

import { TaskCard } from "@/components/cards/TaskCard";
import DoChecks from "@/components/DoChecks";
import { useGetAssignedTasks } from "@/services/tasks";
import { useSession } from "next-auth/react";

export default function AvailableTasks() {
  const session = useSession();
  const userId = session.data?.user?.id;

  const assignedTasksRes = useGetAssignedTasks({ userId });
  const assignedTasks = assignedTasksRes.data?.data?.data || [];
  console.log(assignedTasks);
  console.log(useSession().data);

  return (
    <div className=" p-4 border rounded border-border">
      <DoChecks
        items={assignedTasks}
        emptyText="You currently have no tasks assigned"
        isLoading={assignedTasksRes.isLoading}
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] gap-y-6 gap-x-4 my-6"
      >
        {assignedTasks?.map((task) => (
          <div key={task.id}>
            <TaskCard
              id={task.id}
              serviceName={task.serviceName}
              productCountry={task.productCountry}
              productName={task.productName}
              userId={userId}
            />
          </div>
        ))}
      </DoChecks>
    </div>
  );
}
