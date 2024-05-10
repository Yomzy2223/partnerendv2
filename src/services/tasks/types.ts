import { TFieldTypes } from "../service/types";

export type TGetTasks = {
  assignedAt: string;
  companyName: string;
  completedAt: string;
  createdAt: string;
  createdBy: string;
  currentState: TRequestState;
  id: string;
  paid: boolean;
  partnerInCharge: string;
  productId: string;
  productCountry: string;
  productName: string;
  serviceName: string;
  status: TRequestStatus;
  submittedAt: string;
  updatedAt: string;
};

export type TRequestQAForm = {
  id: string;
  title: string;
  description: string;
  type: TFieldTypes;
  compulsory: boolean;
  isGeneral: boolean;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  requestId: string;
  formId: string;
  subForm: TRequestQASubForm[];
};

export type TRequestQASubForm = {
  id: string;
  question: string;
  answer: string[];
  type: TFieldTypes;
  fileName: string;
  fileType: string;
  fileLink: string;
  fileSize: string;
  compulsory: boolean;
  isDeprecated: boolean;
  requestQAId: string;
  createdAt: string;
  updatedAt: string;
};

export type TBusiness = {
  id: string;
  rcNumber: string;
  companyName: string;
  companyType: string;
  registrationDate: string;
  branchAddress: string;
  companyEmail: string;
  city: string;
  classification: string;
  headOfficeAddress: string;
  lga: string;
  affiliates: string;
  shareCapital: string;
  shareCapitalInWords: string;
  state: string;
  status: string;
  isDeprecated: false;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TRequestStatus = "PENDING" | "SUBMITTED" | "ASSIGNED" | "REJECTED" | "COMPLETED";

export type TRequestState = "PRODUCTINFO" | "SERVICEFORM" | "PAYMENT" | "PRODUCTFORM" | "REVIEW";
