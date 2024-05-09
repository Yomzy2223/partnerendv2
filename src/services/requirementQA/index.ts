import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "@/hooks/useResponse";
import {
  getCountryReqForm,
  getPartnerReqQA,
  savePartnerReqQA,
  updatePartnerReqQA,
} from "./operations";

export const useSavePartnerReqQA = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["save product QA"],
    mutationFn: savePartnerReqQA,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["partnerQA"] });
    },
  });
};

export const useUpdatePartnerReqQA = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["save product QA"],
    mutationFn: updatePartnerReqQA,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["partnerQA"] });
    },
  });
};

export const useGetPartnerReqQA = ({ userId }: { userId: string }) =>
  useQuery({
    queryKey: ["partnerQA", userId],
    queryFn: ({ queryKey }) => getPartnerReqQA(queryKey[1]),
    enabled: !!userId,
  });

export const useGetCountryReqForm = ({ country }: { country: string }) =>
  useQuery({
    queryKey: ["countryForm", country],
    queryFn: ({ queryKey }) => getCountryReqForm(queryKey[1]),
    enabled: !!country,
  });
