import {  useParams } from "next/navigation";
import useProductApi from "@/hooks/useProductApi"
import { useMemo } from 'react';
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useSession } from "next-auth/react";

export const useActions = () => {
    const { setQuery } = useGlobalFunctions()
    // const { userId } = useParams();

    const {data : session } = useSession()
    const requestId = "b7dfaa4f-2804-472d-87c3-dc8b3697f7cf"
    // const countryId = get("countryId") as string || "nigeria";
    const 
        { 
            useGetAssignedTasks, 
            acceptTaskMutation , 
            useGetOngoingTasksQuery, 
            removePendingTaskMutation, 
            rejectTaskMutation,
            useGetRequestDetailsQuery
    } = useProductApi();
    
    
   
    // const countryDataInfo  = countryData?.data?.data;
    // console.log("countryData", countryDataInfo);
    //const userId = get("userId") as string;
    // const userId = get("userId") as string || "c26b821e-d413-4d45-b802-09ba56185c54"
    // console.log("user Id", userId)
    const userId = session?.user.id
    const { data: userData, isLoading, isError } = useGetAssignedTasks(userId);
    console.log("userData", userData)


    const { data: assignedTasks } = useGetOngoingTasksQuery(userId);


    console.log("assigned tasks", assignedTasks);
    
    const {data: eachRequestDetails} = useGetRequestDetailsQuery(requestId);


    console.log("RequestData", eachRequestDetails);

    const acceptTask = async (values: AddTaskProps) => {
        if (userId) {
            try {
                await acceptTaskMutation.mutate({requestInfo: values});
                console.log("Task accepted successfully");
            } catch (error) {
                console.error("Error accepting task:", error);
            }
        }
    }

    const rejectTask = async (values: AddTaskProps) => {
        if (userId) {
            try {
                await rejectTaskMutation.mutate({requestInfo: values});
                console.log("Task rejected");
            } catch (error) {
                console.error("Error rejecting task:", error);
            }
        }
    }

    
    
    // const returnTasks = async (values: RemoveTaskProps) => {
    const returnTasks = async (requestId: string) => {

        if("c26b821e-d413-4d45-b802-09ba56185c54") {
            try {
                await removePendingTaskMutation.mutate(requestId);
                console.log("Task returned to available tab");
            } catch (error) {
                console.error("Error returning task:", error);
            }
        }
       
    }
    

    

    return { 
        userData,
        isLoading, 
        isError,
        assignedTasks,
        eachRequestDetails,
        acceptTask,
        rejectTask,
        returnTasks,

    };
}

interface AddTaskProps {
    userId: string;
    requestIds: string[];
}

interface RemoveTaskProps {
    requestId: string;
}
  