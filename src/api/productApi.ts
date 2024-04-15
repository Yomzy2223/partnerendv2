import { Client } from "@/lib/axios";

interface AddTaskProps {
  userId: string;
  requestIds: string[];
}

export const getAssignedTask = async (userId : string) => {
  const client = await Client();
  return await client.get(`productRequest/assignedTask/${userId}`)
}
  
export const AddProductRequestTask = async ({requestInfo}: {requestInfo: AddTaskProps}) => {
  const client = await Client();
  return await client.post(`/productRequest/accept`, requestInfo)
}

export const RejectProductRequestTask = async ({requestInfo}: {requestInfo: AddTaskProps}) => {
  const client = await Client();
  return await client.post(`/productRequest/reject`, requestInfo)
}

export const getPendingProductRequests = async(userId: string) => {
  const client = await Client();
  return await client.get(`productRequest/acceptedTask/${userId}`)
}

export const removePendingTasks = async (requestId: string) => {
  const client = await Client();
  return await client.put(`productRequest/removeTaskRequest/${requestId}`)
}

export const getEachRequestById = async (id: string) => {
  const client = await Client()
  return await client.get(`productRequest/${id}`)
}