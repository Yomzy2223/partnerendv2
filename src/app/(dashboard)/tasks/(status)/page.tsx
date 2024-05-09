import AvailableTask from "./available/[userId]/available";

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
