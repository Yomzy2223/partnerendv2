import { Client, rootType } from "..";
import { TUserDocCreate, TUserDocGet } from "./types";

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
