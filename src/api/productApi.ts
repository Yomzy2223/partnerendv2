import { Client } from "@/lib/axios";

export const getProductByCountry = async (country : string) => {
    const client = await Client();
    return await client.get(`/service/productRequest/country/${country}`)
  }
  