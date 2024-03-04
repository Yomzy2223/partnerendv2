import useProductApi from "@/hooks/useProductApi";
import { useParams } from "next/navigation";
import useProductApi from "@/hooks/useProductApi"

export const useActions = () => {
    const { countryId } = useParams();
    const { useGetProductByCountryQuery } = useProductApi;
    const { data }  = useGetProductByCountryQuery(country.toString());
    console.log("country product data ", )
}