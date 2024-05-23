"use client";

import TableDetails from "@/components/tables/details/details";
import TableDetailsWrapper from "@/components/tables/details/detailsWrapper";
import { useGetRequestBusinessQuery, useGetRequestQAFormsQuery } from "@/services/tasks";
import { BriefcaseIcon } from "lucide-react";
import React from "react";
import DocSection from "./docSection";

const page = ({ params }: { params: { requestId: string } }) => {
  const { requestId } = params;
  const requestQAFormsRes = useGetRequestQAFormsQuery({ requestId });
  const requestQAForms = requestQAFormsRes.data?.data?.data || [];

  const requestBusinessRes = useGetRequestBusinessQuery({ requestId });
  const requestBusiness = requestBusinessRes.data?.data?.data?.[0];

  return (
    <div className="py-6">
      <TableDetails
        QAForms={requestQAForms}
        isLoading={requestQAFormsRes.isLoading}
        business={requestBusiness}
      >
        <TableDetailsWrapper
          title="Upload Documents"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
        >
          <DocSection businessId={requestBusiness?.id || ""} requestId={requestId} />
        </TableDetailsWrapper>{" "}
      </TableDetails>
    </div>
  );
};

export default page;
