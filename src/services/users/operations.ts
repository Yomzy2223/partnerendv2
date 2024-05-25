import { Client, rootType } from "..";
import { TResetPassword, TSignIn, TSignUp, TUserDocCreate, TUserDocGet } from "./types";

export const signUp = async (formInfo: TSignUp) => {
  const client = await Client();
  return await client.post("/users", formInfo);
};

export const signIn = async (formInfo: TSignIn) => {
  const client = await Client();
  return await client.post("/users/login", formInfo);
};

export const forgotPassword = async (email: string) => {
  const client = await Client();
  return await client.post("/users/forgotpassword", { email });
};

export const resetPassword = async (formInfo: TResetPassword) => {
  const client = await Client();
  return await client.post("/users/passwordreset", formInfo);
};

export const verifyUserEmail = async (token: string) => {
  const client = await Client();
  return await client.post(`/users/verification/${token}`);
};

export const updateUser = async ({ id, formInfo }: { id: string; formInfo: TSignUp }) => {
  const client = await Client();
  return await client.put(`/users/${id}`, formInfo);
};

export const deleteUser = async (id: string) => {
  const client = await Client();
  return await client.delete(`/users/${id}`);
};

export const getUser = async (id: string) => {
  const client = await Client();
  return await client.get(`/users/${id}`);
};

export const getAllUsers = async () => {
  const client = await Client();
  return await client.get(`/users`);
};

//

//

//

export const createUserDoc = async ({ formInfo }: { formInfo: TUserDocCreate }) => {
  const client = await Client();
  return client.post<rootType<TUserDocGet>>(`/userDocument`, formInfo);
};

export const updateUserDoc = async ({ id, formInfo }: { id: string; formInfo: TUserDocCreate }) => {
  const client = await Client();
  return client.put<rootType<TUserDocGet>>(`/userDocument/${id}`, formInfo);
};

export const deleteUserDoc = async (id: string) => {
  const client = await Client();
  return client.delete<rootType<TUserDocGet>>(`/userDocument/${id}`);
};

export const getUserDoc = async (id: string) => {
  const client = await Client();
  return client.get<rootType<TUserDocGet>>(`/userDocument/${id}`);
};

export const getUserBusinessDoc = async (businessId: string) => {
  const client = await Client();
  return client.get<rootType<TUserDocGet>>(`/userDocument/business/${businessId}`);
};
