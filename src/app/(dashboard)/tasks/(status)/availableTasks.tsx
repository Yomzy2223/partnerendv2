"use client";

import { TaskCard } from "@/components/cards/TaskCard";
import TaskCardSkt from "@/components/cards/TaskCard/taskCardSkt";
import DoChecks from "@/components/DoChecks";
import { useGetAssignedTasks } from "@/services/tasks";
import { useSession } from "next-auth/react";

export default function AvailableTasks({ userId }: { userId: string }) {
  const assignedTasksRes = useGetAssignedTasks({ userId });
  const assignedTasks = assignedTasksRes.data?.data?.data || [];

  return (
    <div className="p-4 border rounded border-border my-6">
      <DoChecks
        items={assignedTasks}
        emptyText="You currently have no tasks assigned"
        isLoading={assignedTasksRes.isLoading}
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] gap-y-6 gap-x-4"
        errorText={assignedTasksRes.error?.message}
        Skeleton={[1, 2, 3, 4].map((el) => (
          <TaskCardSkt key={el} />
        ))}
      >
        {assignedTasks?.map((task) => (
          <div key={task.id}>
            <TaskCard info={task} userId={userId} />
          </div>
        ))}
      </DoChecks>
    </div>
  );
}
