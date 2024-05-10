import { useResponse } from "@/hooks/useResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserDoc,
  deleteUserDoc,
  getUserBusinessDoc,
  getUserDoc,
  updateUserDoc,
} from "./operations";

export const useCreateUserDocMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["create user documents"],
    mutationFn: createUserDoc,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user documents"] });
    },
  });
};

export const useUpdateUserDocMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["update user documents"],
    mutationFn: updateUserDoc,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user documents"] });
    },
  });
};

export const useDeleteUserDocMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["delete user documents"],
    mutationFn: deleteUserDoc,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user documents"] });
    },
  });
};

export const useGetUserDocQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["user documents", id],
    queryFn: ({ queryKey }) => getUserDoc(queryKey[1]),
    enabled: !!id,
  });
};

export const useGetUserBusinessDocQuery = ({ businessId }: { businessId: string }) => {
  return useQuery({
    queryKey: ["user documents", businessId],
    queryFn: ({ queryKey }) => getUserBusinessDoc(queryKey[1]),
    enabled: !!businessId,
  });
};
