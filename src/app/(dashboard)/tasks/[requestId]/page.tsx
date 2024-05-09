// import { useParams, useQuery } from "next/navigation";
// import { useState, useEffect } from "react";

// const TaskDetails = () => {
//   const { requestId } = useParams();
//   const [task, setTask] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(`/api/task/${requestId}`);
//         const data = await response.json();
//         setTask(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (requestId) {
//       fetchData();
//     }
//   }, [requestId]);

//   if (isLoading) return <p>Loading task details...</p>;
//   if (error) return <p>Error fetching task: {error.message}</p>;

//   if (!task) return <p>Task not found.</p>; // Handle missing task

//   return (
//     <div>
//       <h2>Task Details for Request ID: {requestId}</h2>
//       {/* Display task details here */}
//       <p>Task Title: {task.title}</p>
//       {/* Display other task properties based on your API response */}
//     </div>
//   );
// };

// export default TaskDetails;

import React from 'react'
import TaskDetails from './RequestDetail'

const page = () => {
  return (
    <TaskDetails />
  )
}

export default page