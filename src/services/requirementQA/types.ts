import { TFieldTypes, TFormCFields } from "../service/types";

export type TReqForm = TFormCFields;

type IFormQA<ISubForm> = {
  title: string;
  description: string;
  type: TFieldTypes;
  compulsory: boolean;
  isGeneral: boolean;
  subForm: ISubForm[];
};

export type TFormQACreate = IFormQA<TSubformQACreate>;

export type TFormQAGet = IFormQA<TSubformQAGet> & {
  id: string;
  requestId: string;
  createdAt: string;
  updatedAt: string;
  formId: string;
};

export type TSubformQACreate = {
  question: string;
  answer: string[];
  type: string;
  compulsory: boolean;
  fileName: string;
  fileLink: string;
  fileType: string;
  fileSize: string;
};

export type TSubformQAGet = TSubformQACreate & {
  id: string;
  type: TFieldTypes;
  fileLink: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  options: string[];
  dependsOn: { field: string; options: string[] };
  allowOther: boolean;
};

export type FileType = {
  name: string;
  size?: string;
  link: string;
  type: string;
};

export type saveReqQAPayload = {
  userId: string;
  formId: string;
  form: TFormQACreate;
};

export type updateReqQAPayload = {
  id: string;
  form: TFormQACreate;
};
