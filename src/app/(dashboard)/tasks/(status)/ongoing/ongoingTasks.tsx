"use client";

import PreviewDetails from "@/components/tables/details/previewDetails";
import GeneralTable from "@/components/tables/generalTable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useActions } from "./actions";

export default function OngoingTask({ userId }: { userId: string }) {
  const [preview, setPreview] = useState("");

  const { tableBody, acceptedTasksRes, requestQAFormsRes, requestBusiness } = useActions({
    userId,
    preview,
    setPreview,
  });

  const requestQAForms = requestQAFormsRes.data?.data?.data || [];
  const totalTasks = acceptedTasksRes.data?.data?.total;

  return (
    <div
      className={cn("flex gap-1 py-4 lg:py-6", {
        "max-w-[100vw]": preview,
      })}
    >
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        itemsLength={totalTasks || 0}
        itemsPerPage={10}
        dataLoading={acceptedTasksRes.isLoading}
        preview={preview}
        hideHeader
      />
      {preview && (
        <PreviewDetails
          selectedRequestId={preview}
          setPreview={setPreview}
          QAForms={requestQAForms}
          business={requestBusiness}
          isLoading={requestQAFormsRes.isLoading}
          detailsUrl={`/tasks/${preview}`}
        />
      )}
    </div>
  );
}

// table header
const tableHeaders = ["S/N", "SERVICE NAME", "PRODUCT NAME", "COUNTRY", "ASSIGNED"];
