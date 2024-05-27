"use client";

import ConfirmAction from "@/components/confirmAction";
import TableDetails from "@/components/tables/details/details";
import TableDetailsWrapper from "@/components/tables/details/detailsWrapper";
import { useGetService } from "@/services/service";
import { useGetRequestQuery, useRejectTasksMutation } from "@/services/tasks";
import { Button } from "flowbite-react";
import { BriefcaseIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DocSection from "./docSection";

const Page = ({ params }: { params: { requestId: string } }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { requestId } = params;

  const path = searchParams.get("path") || "";

  const session = useSession();
  const rejectTaskMutation = useRejectTasksMutation();

  const requestRes = useGetRequestQuery({ requestId });
  const request = requestRes.data?.data?.data;
  const requestBusiness = request?.business;
  const requestQAForms = request?.requestQA || [];

  const serviceRes = useGetService(request?.product?.serviceId || "");
  const service = serviceRes.data?.data?.data;

  const dropTask = () => {
    rejectTaskMutation.mutate(
      { userId: session.data?.user?.id, requestIds: [requestId] },
      {
        onSuccess: () => {
          setOpenConfirm(false);
          router.push("/tasks");
        },
      }
    );
  };

  return (
    <div className="flex flex-col py-6">
      <TableDetails
        QAForms={requestQAForms}
        isLoading={requestRes.isLoading}
        business={requestBusiness}
        prev={{ path: `/tasks/${path}`, text: `${path} tasks` }}
      >
        <TableDetailsWrapper
          title="Upload Documents"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
        >
          <DocSection
            businessId={requestBusiness?.id || ""}
            companyName={requestBusiness?.companyName}
            requestId={requestId}
            requestStatus={request?.status}
            priority={service?.priority}
          />
        </TableDetailsWrapper>

        {request?.status !== "COMPLETED" && (
          <div className="self-end space-x-2">
            <span className="sb-text-16 text-foreground-5">Can&#39;t continue anymore?</span>
            <Button color="failure" onClick={() => setOpenConfirm(true)}>
              Drop Task
            </Button>
          </div>
        )}

        {openConfirm && (
          <ConfirmAction
            open={openConfirm}
            setOpen={setOpenConfirm}
            confirmAction={dropTask}
            title="Drop Task"
            description="Are you sure you want to drop this task? This forfeits your earnings for this task and reduces your chance of getting another task."
            isLoading={rejectTaskMutation.isPending}
            dismissible={!rejectTaskMutation.isPending}
            isDelete
          />
        )}
      </TableDetails>
    </div>
  );
};

export default Page;
