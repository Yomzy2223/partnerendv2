"use client";

import Image from "next/image";
import { countries, getCountryCode, TCountryCode } from "countries-list";
import { Button } from "flowbite-react";
import { useAcceptTasksMutation, useRejectTasksMutation } from "@/services/tasks";
import { Oval } from "react-loading-icons";
import ConfirmAction from "@/components/confirmAction";
import { useState } from "react";

export const TaskCard = ({ id, productCountry, productName, serviceName, userId }: IProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const accepTasks = useAcceptTasksMutation();
  const rejectTasks = useRejectTasksMutation();

  const handleAcceptTasks = () => {
    accepTasks.mutate({ userId, requestIds: [id] });
  };

  const handleRejectTasks = () => {
    rejectTasks.mutate({ userId, requestIds: [id] });
  };

  const originalCountry = Object.keys(countries)
    .map((el: string) => countries[el as TCountryCode].name)
    .find((el) => el.toLowerCase() === productCountry?.toLowerCase());

  let countryCode = getCountryCode(originalCountry || "")
    ?.toString()
    ?.toLowerCase();

  return (
    <div className="border border-border rounded p-4 space-y-3">
      <div className="flex justify-between gap-6">
        <div className="flex gap-3">
          <Image
            src={`https://flagcdn.com/w160/${countryCode}.png`}
            alt={productCountry}
            width={28}
            height={24}
            className="rounded object-contain"
          />
          <p className="text-sm ">{originalCountry}</p>
        </div>
        <span className="text-xs bg-success text-success-foreground px-2.5 py-0.5 rounded">
          {serviceName}
        </span>
      </div>

      <p className="">{productName}</p>

      <div className="flex justify-between w-full">
        <Button
          color="primary"
          onClick={handleAcceptTasks}
          isProcessing={accepTasks.isPending}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          Accept Task
        </Button>
        <Button
          outline
          onClick={() => setOpenConfirm(true)}
          title="Reject"
          className="border-gray-200 border-2"
        >
          Reject
        </Button>
      </div>

      {openConfirm && (
        <ConfirmAction
          open={openConfirm}
          setOpen={setOpenConfirm}
          confirmAction={handleRejectTasks}
          title="Reject Task"
          description="Are you sure you want to reject this task?"
          isLoading={rejectTasks.isPending}
          dismissible={!rejectTasks.isPending}
          isDelete
        />
      )}
    </div>
  );
};

interface IProps {
  id: string;
  productCountry: string;
  productName: string;
  serviceName: string;
  userId: string;
}
