import { Client, rootType } from "../index";
import { TFormQAGet, saveReqQAPayload, updateReqQAPayload, TReqForm } from "./types";

export const savePartnerReqQA = async ({ userId, form }: saveReqQAPayload) => {
  const client = await Client();
  return client.post<rootType<TFormQAGet[]>>(`/partner/formAnswer/${userId}`, form);
};

export const updatePartnerReqQA = async ({ id, form }: updateReqQAPayload) => {
  const client = await Client();
  return client.put<rootType<TFormQAGet[]>>(`/partner/formAnswer/${id}`, form);
};

export const getPartnerReqQA = async (userId: string) => {
  const client = await Client();
  return client.get<rootType<TFormQAGet[]>>(`/partner/formAnswer/${userId}`);
};

export const getCountryReqForm = async (country: string) => {
  const client = await Client();
  return client.get<rootType<TReqForm[]>>(`/partner/forms/${country}`);
};
