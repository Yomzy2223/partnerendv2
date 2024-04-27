import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  getAssignedTask, AddProductRequestTask, getPendingProductRequests, removePendingTasks, RejectProductRequestTask, getEachRequestById} from "@/api/productApi"
import { useResponse } from "./useResponse";
import { useGlobalFunctions } from "@/hooks/globalFunctions";

const useProductApi = () => {
    const { handleError, handleSuccess } = useResponse();
    const queryClient = useQueryClient(); 

    const useGetAssignedTasks = (userId: string) =>  
        useQuery({
            queryKey: ["userId", userId ],
            queryFn: ({queryKey}) => getAssignedTask(queryKey[1]),
            enabled: userId ? true : false,
            refetchOnMount(query) {
                return !!query;
            },
        });
    
    const useGetRequestDetailsQuery = (requestId: string) => 
        useQuery({
            queryKey:  ["requestId", requestId ],
            queryFn : ({queryKey}) => getEachRequestById(queryKey[1]),
            enabled: requestId ? true : false,
            
        })
    
   
    const acceptTaskMutation = useMutation({
        mutationFn: AddProductRequestTask,
        onError(error) {
            handleError({ title: "Failed", error });
        },
        onSuccess(data, variables, context) {
            handleSuccess({data});
            queryClient.invalidateQueries({ queryKey: ["country"]})
        },

        retry: 3
    });

    const rejectTaskMutation = useMutation({
        mutationFn: RejectProductRequestTask,
        onError(error) {
            handleError({ title: "Failed", error });
        },
        onSuccess(data, variables, context) {
            handleSuccess({data});
            queryClient.invalidateQueries({ queryKey: ["country"]})
        },
        retry: 3
    });


    
    const removePendingTaskMutation = useMutation({
        mutationFn: removePendingTasks,
        onError(error) {
          handleError({ title: "Failed", error });
        },
        onSuccess(data) {
          handleSuccess({ data });
          queryClient.invalidateQueries({ queryKey: ["userId"] });
        },
        retry: 3,
      });



    const useGetOngoingTasksQuery = (userId: string) =>
        useQuery({
            queryKey: ["userId", userId],
            queryFn: ({ queryKey }) => getPendingProductRequests(queryKey[1]),
            enabled: userId ? true : false,
        });



    
    return {
        useGetAssignedTasks,
        useGetRequestDetailsQuery,
        acceptTaskMutation,
        rejectTaskMutation,
        useGetOngoingTasksQuery,
        removePendingTaskMutation,
       

    }
}

export default useProductApi;