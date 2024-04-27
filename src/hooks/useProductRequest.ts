import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "./useResponse";
import { saveRequestQA } from "@/api/ProductRequestFormApi";
import { useToast } from "@/components/ui/use-toast";

type FormItem = {
    question: string;
    answer: string[];
    type: string;
    compulsory: boolean;
    isGeneral: boolean;
    file?: File;
  };



const useProductRequestApi = () => {
    const { toast } = useToast();

    const { handleError, handleSuccess } = useResponse();
    const queryClient = useQueryClient();

    const useSaveProductRequestQA = useMutation({
        mutationKey: ["Save Request QA"],
        mutationFn: saveRequestQA,
        onError(error: any) {
            const errorMessage = error.response.data.error;
            toast({
              className: "bg-red-200 border border-destructive-foreground",
              title: "Failed",
              description: errorMessage,
              // success: hideIcon ? null : false,
              // action,
            });
          },
        onSuccess(data, variables, context) {
            handleSuccess({data});
            queryClient.invalidateQueries({ queryKey: ["requestId"]})
        },
        retry: 3
    })

    return {
        useSaveProductRequestQA
    }
}



export default useProductRequestApi