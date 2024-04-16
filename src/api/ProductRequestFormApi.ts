import { Client } from "@/lib/axios";

type FileType = {
  name: string;
  size?: string;
  link: string;
  type: string;
};

type FormItem = {
    question: string;
    answer: string[];
    type: string;
    compulsory: boolean;
    isGeneral: boolean;
    file?: FileType;
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


export const saveRequestQA = async ({requestId, form}:  RequestQAProp) => {
    const client = await Client();
    return await client.post(`/productRequest/form/${requestId}`, form)
}

