import TaskCardSkt from "@/components/cards/TaskCard/taskCardSkt";
import React from "react";

const loading = () => {
  return (
    <div className="p-4 border rounded border-border">
      {[1, 2, 3, 4].map((el) => (
        <TaskCardSkt key={el} />
      ))}
    </div>
  );
};

export default loading;
