import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCountries } from "@/api/countryApi";

const useCountryApi = () => {
    const getAllCountriesQuery = useQuery({
        queryKey: ["country"],
        queryFn: getCountries,
    });

    return {
        getAllCountriesQuery
    }
}


export default useCountryApi