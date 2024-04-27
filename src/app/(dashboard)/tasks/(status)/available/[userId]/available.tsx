"use client"
import { useActions } from "../../actions";
import { TaskCard } from "@/components/cards/TaskCard";
import { Puff } from "react-loading-icons";
import {  useParams, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import ConfirmAction from "@/components/confirmAction";
import { useSession } from "next-auth/react";
import useCountryApi from "@/hooks/useCountryApi";
import { CountryTypes } from "@/types/type";

type CountryDataProps = {
    id: string;
    email: string | null;
    paid: boolean;
    businessName: string;
    serviceName: string;
    requeststatus: string;
};


const AvailableTask = () => {
    const { getAllCountriesQuery } = useCountryApi();
    const { data: countries } = getAllCountriesQuery;
    const countryList = countries?.data.data
    const [openConfirm, setOpenConfirm] = useState(false);
    const { acceptTask, userData, isLoading, rejectTask,  } = useActions();
   
    const { data: session } = useSession();
    const userId = session?.user.id;
   
    const assignedDataInfo = userData?.data?.data;

    const handleAcceptTask = (taskId: string) => {
        const taskObject = assignedDataInfo.find((task:any) => task.id === taskId);

        if(taskObject){
            console.log("userIds", userId)
            console.log("taskObject", taskObject)
        }
        console.log("taskObject added", taskObject)   
    };

   

    const handleRejectTask = (taskId: string) => {
        const taskObject = assignedDataInfo.find((task:any) => task.id === taskId);
        if (taskObject) {
            console.log("userIds", userId)
            console.log("taskObject", taskObject)
        }
        console.log("taskObject removed", taskObject)
    };

    const countryIso = countryList?.map((country: CountryTypes) => country.iso) || [];
    console.log("countryNames", countryIso)
    return (
        <div>
            {isLoading ? (
                <div className="flex w-100 h-100 justify-center items-center">
                    <Puff stroke="#00A2D4" />
                </div>
            ) : (
                <div className="my-6 p-4 border rounded border-border flex flex-col gap-8">
                <div className="flex flex-col w-full space-y-4">
                    <h5 className="text-gray-500">OTHER</h5>
                    <div className="grid grid-cols-4 gap-y-6 gap-x-4">
                        {assignedDataInfo && assignedDataInfo.map((data: CountryDataProps, index: number) => (
                            <div key={index}>
                                <TaskCard
                                    id={data.id} 
                                    servicename={data.serviceName}
                                    countryName={data.businessName}
                                    countryCode="ng"
                                    businessName="Nil"
                                    onAcceptTask={handleAcceptTask}
                                    onRejectTask={() => setOpenConfirm(true)}
                            />
                            </div>
                           
                        ))}
                       
                        {openConfirm && (
                            <ConfirmAction
                                open={openConfirm}
                                setOpen={setOpenConfirm}
                                confirmAction={() => handleRejectTask}
                                title="Reject Task"
                                description="Are you sure you want to reject this task"
                                isLoading={isLoading}
                                dismissible={!isLoading}
                                isDelete
                            />
                            )}
                    </div>
                </div>
            </div>
            )}
        </div>
       
    )
}

export default AvailableTask;