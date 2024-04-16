import { TaskCard } from "@/components/cards/TaskCard";
import useProductApi from "@/hooks/useProductApi";
import { useParams } from "next/navigation";
import AvailableTask from "./available/[userId]/available";
// import { useCustomActions } from "@/hooks/useCustomActions";

const Tasks = () => {
  return (
    <div className="my-6 p-4 border rounded border-border flex flex-col gap-8">
      <div className="flex flex-col w-full space-y-4">
        <AvailableTask/>
      </div>
    </div>
  );
};

export default Tasks;
