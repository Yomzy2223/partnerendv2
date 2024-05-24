import { IFormInput } from "../constants";
import * as z from "zod";

export const formInfo: IFormInput[] = [
  {
    name: "rcNumber",
    fieldName: "RC Number",
    label: "RC Number",
    type: "text",
    textInputProp: {
      placeholder: "Enter RC Number",
    },
  },
  {
    name: "companyName",
    fieldName: "company name",
    label: "Registered company name",
    type: "text",
    textInputProp: {
      placeholder: "Enter registered company name",
    },
  },
  {
    name: "companyEmail",
    fieldName: "company email",
    label: "Registered company email",
    type: "text",
    textInputProp: {
      placeholder: "Enter registered company email",
    },
  },
  {
    name: "companyType",
    fieldName: "company type",
    label: "Company type",
    type: "text",
    textInputProp: {
      placeholder: "Enter company type",
    },
  },
  {
    name: "branchAddress",
    fieldName: "branch address",
    label: "Branch Address",
    type: "text",
    textInputProp: {
      placeholder: "Enter branch address",
    },
  },
  {
    name: "classification",
    label: "Classification",
    type: "text",
    textInputProp: {
      placeholder: "Enter classification",
    },
  },
  {
    name: "headOfficeAddress",
    fieldName: "Head office address",
    label: "Head Office Address",
    type: "text",
    textInputProp: {
      placeholder: "Enter head office address",
    },
  },
  {
    name: "lga",
    label: "LGA",
    type: "text",
    textInputProp: {
      placeholder: "Enter LGA",
    },
  },
  {
    name: "city",
    label: "Company city",
    type: "text",
    textInputProp: {
      placeholder: "Enter company city",
    },
  },
  {
    name: "state",
    label: "Company state",
    type: "text",
    textInputProp: {
      placeholder: "Enter company state",
    },
  },
  {
    name: "affiliates",
    label: "Affiliates",
    type: "text",
    textInputProp: {
      placeholder: "Enter affiliates",
    },
  },
  {
    name: "shareCapital",
    fieldName: "share capital",
    label: "Share capital",
    type: "text",
    textInputProp: {
      placeholder: "Enter share capital",
    },
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    selectProp: {
      placeholder: "Select current status",
    },
    options: ["Active", "Inactive"],
  },
];

export const formSchema = z.object({
  rcNumber: z.coerce.number().min(1, { message: "Enter RC Number" }),
  companyName: z.string().min(1, { message: "Enter registered company name" }),
  companyEmail: z.string().min(1, { message: "Enter registered company email" }),
  companyType: z.string().min(1, { message: "Enter company type" }),
  branchAddress: z.string().min(1, { message: "Enter branch address" }),
  classification: z.string().min(1, { message: "Enter classification" }),
  headOfficeAddress: z.string().min(1, { message: "Enter head office address" }),
  lga: z.string().min(1, { message: "Enter LGA" }),
  city: z.string().min(1, { message: "Enter company city" }),
  state: z.string().min(1, { message: "Enter company state" }),
  affiliates: z.coerce.number().min(1, { message: "Enter affiliates" }),
  shareCapital: z.string().min(1, { message: "Enter share capital" }),
  status: z.string().min(1, { message: "Select current status" }),
});

export type formType = z.infer<typeof formSchema>;
