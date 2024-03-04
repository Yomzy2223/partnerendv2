import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getProductByCountry
} from "@/api/productApi"
import { useResponse } from "./useResponse";

export const useProductApi = () => {
    const { handleError, handleSuccess } = useResponse();
    const queryClient = useQueryClient(); 

    const useGetProductByCountryQuery = (country: string) =>  useQuery({
        queryKey: ["country", country ],
        queryFn: ({}) => getProductByCountry,
    });

    return {
        useGetProductByCountryQuery
    }
}

export default useProductApi;