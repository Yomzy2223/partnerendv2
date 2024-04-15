import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "./useResponse";
import { saveRequestQA } from "@/api/ProductRequestFormApi";

type FormItem = {
    question: string;
    answer: string[];
    type: string;
    compulsory: boolean;
    isGeneral: boolean;
    file?: File;
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
const useProductRequestApi = () => {
    const { handleError, handleSuccess } = useResponse();
    const queryClient = useQueryClient();

    const useSaveProductRequestQAMutation = useMutation({
        mutationKey: ["Save Request QA"],
        mutationFn: saveRequestQA,
        onError(error) {
            handleError({ title: "Failed", error });
        },
        onSuccess(data, variables, context) {
            handleSuccess({data});
            queryClient.invalidateQueries({ queryKey: ["requestId"]})
        },

        retry: 3
    })

    return {
        useSaveProductRequestQAMutation
    }
}



export default useProductRequestApi