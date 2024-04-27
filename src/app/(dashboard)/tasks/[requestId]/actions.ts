import { useParams } from "next/navigation"
import useProductRequestApi from "@/hooks/useProductRequest"
import { sluggify } from "@/lib/utils";

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

export const useAction = ({ form }: { form: requestFormType | productFormType }) => {
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