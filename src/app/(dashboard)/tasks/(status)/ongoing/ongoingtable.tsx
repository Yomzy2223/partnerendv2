"use client";
import React from "react";
import { Badge, Table } from "flowbite-react";
import numeral from "numeral";
import { useActions } from "../actions";
import { usePathname, useRouter } from "next/navigation";
import { Puff } from "react-loading-icons";

type CountryDataProps = {
  id: string;
  email: string | null;
  paid: boolean;
  businessName: string;
  serviceName: string;
  requestStatus: string;
  userid:string;
};
export const OngoingTable = () => {
  const { assignedTasks, isLoading, returnTasks } = useActions();
  const ongoingTasksList = assignedTasks?.data?.data;
  console.log("ongoing tasks", ongoingTasksList)

  const handleReturnTaskToAvailable = (taskId: string) => {
    const taskObject = ongoingTasksList.find((task:any) => task.id === taskId);
    // console.log("taskObject", taskObject);
    if (taskObject) {
      const userId = taskObject.id;
      // console.log("taskfound found:", userIds);
      returnTasks(userId);
    } else {
      console.error("Task not found:", taskId);
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  // const onClick = () => router.push(pathname + "/reg1");

  const handleRowClick = (data: CountryDataProps) => {
    //router.push( + `/${data.id}`);
    //const requestId = 
    router.push(`/tasks/${data.id}`);
  };
  
  return (
    <React.Fragment>
        <div>
          {isLoading ? (
            <div className="flex w-100 h-100 justify-center items-center">
              <Puff stroke="#00A2D4" />
            </div>
          ) : (
            <div>
              <Table striped hoverable className="drop-shadow-none">
            <Table.Head>
              <Table.HeadCell className="text-gray-500">S/N</Table.HeadCell>
              <Table.HeadCell className="text-gray-500">
                Business name
              </Table.HeadCell>
              <Table.HeadCell className="text-gray-500">
                Service type
              </Table.HeadCell>
              <Table.HeadCell className="text-gray-500">
                Status
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {ongoingTasksList && ongoingTasksList.map((data: CountryDataProps, index: number) => (
                <Table.Row key={index} onClick={() => handleRowClick(data)} className="cursor-pointer">
                  <Table.Cell>{numeral(index + 1).format("00")}</Table.Cell>
                  
                  <Table.Cell>
                    <p className="text-gray-900 font-semibold text-sm">
                      {/* {data?.businessname} */}
                      Nil
                    </p>
                 
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Badge className="w-fit">
                      {data.serviceName}
                    </Badge>
                  
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Badge className="w-fit">
                      {data.requestStatus}
                     
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}    
            </Table.Body>
          </Table>
            </div>
          )}
          
          <div className="px-4 pt-4 flex justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="text-gray-900 font-semibold">1-9</span> of{" "}
              <span className="text-gray-900 font-semibold">1000</span>
            </p>
          </div>

        </div>
    </React.Fragment>
  );
};



