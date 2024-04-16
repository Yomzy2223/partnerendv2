

import { useRouter } from 'next/router';
type TaskProps = {
  id: string;
  email: string | null;
  paid: boolean;
  businessname: string;
  servicename: string;
  requeststatus: string;
  userid: string;
};


const TaskDetails = ({ task }: { task: TaskProps }) => {
  const router = useRouter();
  const { taskId } = router.query; 

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <div>
      <h1>{task.businessname}</h1>
      <p>Service: {task.servicename}</p>
      <p>Status: {task.requeststatus}</p>
      {/* Display other relevant task details here */}
    </div>
  );
};

export default TaskDetails;