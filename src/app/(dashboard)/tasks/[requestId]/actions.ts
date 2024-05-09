import { useParams } from "next/navigation"
import useProductRequestApi from "@/hooks/useProductRequest"
import { sluggify } from "@/lib/utils";
import { uploadFileToCloudinary,  useGlobalFunctions } from "@/hooks/globalFunctions";
import { Dispatch, SetStateAction } from "react";

type FileType = {
    name: string;
    size?: string | undefined;
    link: string;
    type: string;
}

type serviceFormSubFormType = {
    id: string;
    question: string;
    type: string;
    options: string[];
    compulsory: boolean;
    createdAt: string;
    updatedAt: string;
    formId: string;
};


type requestFormType = {
    id: string;
    title: string;
    description: string;
    type: string;
    compulsory: boolean;
    createdAt: string;
    updatedAt: string;
    serviceId: string;
    subForm: serviceFormSubFormType[];
  };

export type productSubFormType = {
    id: string;
    question: string;
    type: string;
    options: string[];
    formId: string;
    compulsory: true;
    fileName: string | null;
    fileLink: string | null;
    fileType: string | null;
    fileSize: string | null;
    allowOther: boolean;
    documentType: string;
    dependsOn: {
        field: string;
        options: string[];
    };
    createdAt: string;
    updatedAt: string;
    isDeprecated: boolean;
};

type productFormType = {
    id: string;
    title: string;
    type: string;
    description: string;
    compulsory: boolean;
    createdAt: string;
    isDeprecated: boolean;
    updatedAt: string;
    productId: string;
    productSubForm: productSubFormType[];
};
function isRequestFormType(form: any): form is requestFormType {
    return "requestId" in form;
  }
export function isFileType(obj: any): obj is FileType {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "name" in obj &&
      typeof obj.name === "string" &&
      "size" in obj &&
      (typeof obj.size === "string" || obj.size === undefined) &&
      "link" in obj &&
      typeof obj.link === "string" &&
      "type" in obj &&
      typeof obj.type === "string"
    );
  }

export const useAction = ({ 
    form 
  }: 
  { 
    form: requestFormType | productFormType 
  }) => {
    const {requestIds} = useParams()
    const requestId = "b7dfaa4f-2804-472d-87c3-dc8b3697f7cf"
    const {  useSaveProductRequestQA } = useProductRequestApi();

    const saveRequestQA = useSaveProductRequestQA;

    // save reuest
    const saveFormRequestsQA = async ({
        requestId,
        values,
        isGeneral,
        requestFormId,
      }: {
        requestId: string;
        values: { [x: string]: string | string[] };
        isGeneral?: boolean;
        requestFormId?: string;
      }) => {
        const formQA: FormItem[] = Object.keys(values).map((slug) => {
          const subForm = isRequestFormType(form)
            ? form.subForm?.find((el) => sluggify(el.question) === slug)
            : form.productSubForm?.find((el) => sluggify(el.question) === slug);
    
          return {
            question: subForm?.question,
            answer: Array.isArray(values[slug]) ? values[slug] : [values[slug]],
            compulsory: subForm?.compulsory,
            isGeneral: true,
            type: subForm?.type,
          } as FormItem;
        });
    
        // save the answers
        if (!requestFormId)
          return await saveRequestQA.mutateAsync(
            {
              requestId,
              form: {
                title: form.title,
                description: form.description,
                type: form.type,
                compulsory: form.compulsory,
                isGeneral: isGeneral || false,
                subForm: formQA,
              },
            },
            {
             
              onError: (err) => {
                console.log(err);
              },
            }
          );
      };

    return {
        saveFormRequestsQA,
        savingForm: saveRequestQA.isPending
    }

}

export const useNewFormAction = ({
  info,
  // QAForm,
  handleSubmit,
  setIsUploading, 
}:INewFormActionProps) => {
  const { userCloudFolder } = useGlobalFunctions();

  const submitHandler = ({
    values,
    setEdit,
    fileData,
  }: {
    values: { [x: string]: any };
    setEdit: Dispatch<SetStateAction<boolean>>;
    fileData?: {
      fileName: string;
      fileLink: string;
      fileType: string;
    };
  }) => {
    const newValues = fileData
      ? { ...values, ...fileData }
      : values;
    console.log("Submitting values:", newValues);
    if (setEdit) {
      setEdit(true);
    }
  }

  const submitFormHandler = async (
    values: Record<any, any>
    // reset: UseFormReset<any>
  ) => {
    if (!info) return;

    let resArray: any[] = [];

    try {
      setIsUploading(true);
      resArray = await Promise.all(
        docSubforms.map(async (el, i: number) => {
          let file: any = values[sluggify(el.question)];
          let isANewFile: boolean = file instanceof File;
          
          let response = {
            id: getQAField(el.question)?.id,
            question: el.question,
            answer: [],
            type: el.type,
            compulsory: el.compulsory,
            fileName: "",
            fileLink: "",
            fileType: "",
            fileSize: "",
          };
          if (isANewFile) {
            // If it's a new files, then upload them to cloudinary
            const uploadRes = await uploadFileToCloudinary({
              file: values[sluggify(el.question)],
              folderName: userCloudFolder,
            });
            response.fileName = uploadRes.data?.original_filename;
            response.fileLink = uploadRes.data?.secure_url;
            response.fileType = uploadRes.data?.secure_url.split(".").pop();
            response.fileSize = uploadRes.data?.bytes?.toString();
          } else {
            // If it's not a new file, then set back the old file
            response.fileName = file?.fileName;
            response.fileLink = file?.fileLink;
            response.fileType = file?.fileType;
            response.fileSize = file?.fileSize;
          }

          return response;
        })
      );
      setIsUploading(false);
    } catch (err) {
      console.log(err);
      setIsUploading(false);
    }

    const docsAreComplete = resArray?.length === docSubforms?.length;
    const docSubformQA = docsAreComplete ? resArray : docSubforms;

    const payload = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: false,
      subForm: [...nonDocSubformsQA, ...docSubformQA],
    };

  };

}



interface INewFormActionProps {
  info: TServiceForm | TProductForm;
  // QAForm?: TFormQAGet;
  handeleSubmit: () => void;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
}


type FormItem = {
    question: string;
    answer: string[];
    type: string;
    compulsory: boolean;
    isGeneral: boolean;
    file: {
        name: string;
        link: string;
        size: string;
        type: string;
    }
  };


interface RequestQAProp {
    requestId: string;
    form: {
      title: string;
      description: string;
      type: string;
      compulsory: boolean;
      isGeneral: boolean;
      subForm: FormItem[];
    };
}

export type serviceType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  label: string;
  priority: number;
};

export type countryType = {
  id: string;
  name: string;
  iso: string;
  currency: string;
  code: string;
  flagUrl: string;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  country: string;
  currency: string;
  amount: number;
  timeline: string;
  feature: string[];
  serviceId: string;
  // hasShares: boolean;
  // hasAgent: boolean;
  // hasOwner: boolean;
  // hasController: boolean;
  // controllerIsCalled: string | null;
  // ownerIsCalled: string | null;
  // agentIsCalled: string | null;
  // createdAt: string;
  // updatedAt: string;
  // serviceCategoryId: string;
};

type TFormCFields = {
  id: string;
  title: string;
  type: string;
  description: string;
  compulsory: boolean;
  createdAt: string;
  isDeprecated: boolean;
  updatedAt: string;
  subForm: TSubForm[];
};

export type TProductForm = TFormCFields & {
  productId: string;
};

export type TServiceForm = TFormCFields & {
  serviceId: string;
};

export type TSubForm = {
  id: string;
  question: string;
  type: TFieldTypes;
  options: string[];
  formId: string;
  compulsory: boolean;
  fileName: string;
  fileLink: string;
  fileType: string;
  fileSize: string;
  allowOther: boolean;
  documentType: string;
  dependsOn: {
    field: string;
    options: string[];
  };
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
};

export type TFieldTypes =
  | "text"
  | "password"
  | "business name"
  | "checkbox"
  | "countries-operation"
  | "countries-all"
  | "document template"
  | "document upload"
  | "select"
  | "email"
  | "paragraph"
  | "objectives"
  | "phone number"
  | "promocode"
  | "multiple choice"
  | "short answer";
