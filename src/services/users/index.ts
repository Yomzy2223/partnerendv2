import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  createUserDoc,
  deleteUser,
  deleteUserDoc,
  forgotPassword,
  getUser,
  getUserBusinessDoc,
  getUserDoc,
  resetPassword,
  updateUser,
  updateUserDoc,
  verifyUserEmail,
} from "./operations";

//
export const useForgotPasswordMutation = () => {
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: forgotPassword,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
    },
  });
};

export const useResetPasswordMutation = () => {
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: resetPassword,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
    },
  });
};

export const useVerifyUserEmailMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: verifyUserEmail,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: updateUser,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: deleteUser,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useGetUserQuery = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: ({ queryKey }) => getUser(queryKey[1]),
    enabled: id ? true : false,
  });

//

//  USER DOCUMENTS ENDPOINTS

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
