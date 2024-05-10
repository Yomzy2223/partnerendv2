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
} from "./operations";

export const useAcceptTasksMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["accept tasks"],
    mutationFn: acceptTasks,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useRejectTasksMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["reject tasks"],
    mutationFn: rejectTasks,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useGetAssignedTasks = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: ({ queryKey }) => getAssignedTasks(queryKey[1]),
    enabled: !!userId,
  });
};

export const useGetAcceptedTasks = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: ({ queryKey }) => getAcceptedTasks(queryKey[1]),
    enabled: !!userId,
  });
};

export const useGetCompletedTasks = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["tasks", userId],
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
    queryKey: ["request", requestId],
    queryFn: ({ queryKey }) => getRequestBusiness(queryKey[1]),
    enabled: !!requestId,
  });
};
