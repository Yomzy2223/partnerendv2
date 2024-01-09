import { TaskCard } from "@/components/cards/TaskCard";

const Tasks = () => {
  return (
    <div className="my-6 p-4 border rounded border-border flex flex-col gap-8">
      <div className="flex flex-col w-full space-y-4">
        <h5 className="text-gray-500">TODAY</h5>
        <div className="grid grid-cols-4 gap-y-6 gap-x-4">
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4">
        <h5 className="text-gray-500">OTHER</h5>
        <div className="grid grid-cols-4 gap-y-6 gap-x-4">
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
          <TaskCard
            countryName="Nigeria"
            countryCode="ng"
            businessName="Sayo Oil and Gas"
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
