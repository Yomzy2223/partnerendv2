import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  acceptTasks,
  getAcceptedTasks,
  getAssignedTasks,
  getCompletedTasks,
  getRequestBusiness,
  getRequestQAForms,
  rejectTasks,
  updateBusinessInfo,
} from "./operations";

export const useAcceptTasksMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationKey: ["accept tasks"],
    mutationFn: acceptTasks,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["Assigned Tasks", "Accepted Tasks", "Completed Tasks"],
      });
    },
  });
};

export const useRejectTasksMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationKey: ["reject tasks"],
    mutationFn: rejectTasks,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess(data);
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["Assigned Tasks", "Accepted Tasks", "Completed Tasks"],
      });
    },
  });
};

export const useGetAssignedTasks = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["Assigned Tasks", userId],
    queryFn: ({ queryKey }) => getAssignedTasks(queryKey[1]),
    enabled: !!userId,
  });
};

export const useGetAcceptedTasks = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["Accepted Tasks", userId],
    queryFn: ({ queryKey }) => getAcceptedTasks(queryKey[1]),
    enabled: !!userId,
  });
};

export const useGetCompletedTasks = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["Completed Tasks", userId],
    queryFn: ({ queryKey }) => getCompletedTasks(queryKey[1]),
    enabled: !!userId,
  });
};

export const useGetRequestQAFormsQuery = ({ requestId }: { requestId: string }) => {
  return useQuery({
    queryKey: ["QAForms", requestId],
    queryFn: ({ queryKey }) => getRequestQAForms(queryKey[1]),
    enabled: !!requestId,
  });
};

export const useGetRequestBusinessQuery = ({ requestId }: { requestId: string }) => {
  return useQuery({
    queryKey: ["business info", requestId],
    queryFn: ({ queryKey }) => getRequestBusiness(queryKey[1]),
    enabled: !!requestId,
  });
};

export const useUpdateBusinessInfoMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationKey: ["update business info"],
    mutationFn: updateBusinessInfo,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["business info"] });
    },
  });
};
