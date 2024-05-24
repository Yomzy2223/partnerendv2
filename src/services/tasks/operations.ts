import { Client } from "@/lib/axios";
import { rootType } from "..";
import {
  TBusinessInfoCreate,
  TBusinessInfoGet,
  TGetTasks,
  TRequest,
  TRequestQAForm,
} from "./types";

export const acceptTasks = async (form: { userId: string; requestIds: string[] }) => {
  const client = await Client();
  return client.post<rootType<[]>>(`/productRequest/accept`, form);
};

export const rejectTasks = async (form: { userId: string; requestIds: string[] }) => {
  const client = await Client();
  return client.post<rootType<[]>>(`/productRequest/reject`, form);
};

export const getAssignedTasks = async (userId: string) => {
  const client = await Client();
  return client.get<rootType<TGetTasks[]>>(`/productRequest/assignedTask/${userId}`);
};

export const getAcceptedTasks = async (userId: string) => {
  const client = await Client();
  return client.get<rootType<TGetTasks[]>>(`/productRequest/acceptedTask/${userId}`);
};

export const getCompletedTasks = async (userId: string) => {
  const client = await Client();
  return client.get<rootType<TGetTasks[]>>(`/productRequest/completed/${userId}`);
};

export const getRequest = async (id: string) => {
  const client = await Client();
  return client.get<rootType<TRequest>>(`/productRequest/${id}`);
};

export const getRequestQAForms = async (requestId: string) => {
  const client = await Client();
  return client.get<rootType<TRequestQAForm[]>>(`/productRequest/form/${requestId}`);
};

export const getRequestBusiness = async (requestId: string) => {
  const client = await Client();
  return client.get<rootType<TBusinessInfoGet[]>>(`/businessRequest/request/${requestId}`);
};

export const updateBusinessInfo = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TBusinessInfoCreate;
}) => {
  const client = await Client();
  return client.put<rootType<TBusinessInfoGet>>(`/businessRequest/${id}`, formInfo);
};
