import { Client } from "@/lib/axios";

export const getCountries = async () => {
    const client = await Client();
    return await client.get(`/countries`);
  };
  