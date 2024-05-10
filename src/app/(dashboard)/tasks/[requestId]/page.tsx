"use client";

import PersonsCard from "@/components/cards/personsCard";
import { FileInput } from "@/components/file/fileInput";
import TextWithDetails from "@/components/texts/textWithDetails";
import RequestDetailsSectionWrapper from "@/components/wrappers/requestDetailsSectionWrapper";
import { useGetRequestBusinessQuery, useGetRequestQAFormsQuery } from "@/services/tasks";
import { Button } from "flowbite-react";
import { BriefcaseIcon, PlusCircle } from "lucide-react";
import React from "react";

const page = ({ params }: { params: { requestId: string } }) => {
  const requestQAFormsRes = useGetRequestQAFormsQuery({ requestId: params.requestId });
  const requestQAForms = requestQAFormsRes.data?.data?.data;

  const requestBusinessRes = useGetRequestBusinessQuery({ requestId: params.requestId });
  const requestBusiness = requestBusinessRes.data?.data?.data?.[0];

  const nonPersonForms = requestQAForms?.filter((el) => el.type !== "person");
  const personForms = requestQAForms?.filter((el) => el.type === "person");
  const titles = [...new Set(personForms?.map((el) => el.title))];
  const personFormByTitle = titles?.map((title) =>
    personForms?.filter((form) => form.title === title)
  );

  return (
    <div className="py-6">
      <div className="flex flex-col gap-8">
        {requestBusiness?.companyEmail && (
          <RequestDetailsSectionWrapper
            title="Business Information"
            icon={<BriefcaseIcon />}
            raiseIssueAction={() => {}}
            className="flex flex-col gap-6"
          >
            {/* <TextWithDetails title="Operational Country" text={requestDetails?.product.country} />
          <TextWithDetails title="Product Type" text={requestDetails?.currentState} />{" "} */}
          </RequestDetailsSectionWrapper>
        )}

        {nonPersonForms?.map((form) => (
          <RequestDetailsSectionWrapper
            key={form.id}
            title={form.title}
            icon={<BriefcaseIcon />}
            raiseIssueAction={() => {}}
            className="flex flex-col gap-6"
          >
            {form.subForm
              ?.filter((field) => field.answer)
              ?.map((field) => (
                <TextWithDetails key={field.id} title={field.question} list={field.answer} />
              ))}
          </RequestDetailsSectionWrapper>
        ))}

        {personFormByTitle?.map((formGroup, i) => {
          return (
            <RequestDetailsSectionWrapper
              key={i}
              title={titles[i]}
              icon={<BriefcaseIcon />}
              raiseIssueAction={() => {}}
              className="flex flex-col gap-6 p-0 w-[600px] max-w-max"
            >
              <PersonsCard
                title={titles[i]}
                info={formGroup?.map((form) =>
                  form.subForm.map((field) => ({
                    field: field.question,
                    value: field.answer,
                    type: field.type,
                    fileName: field.fileName,
                    fileLink: field.fileLink,
                    fileType: field.fileType,
                    fileSize: field.fileSize,
                  }))
                )}
              />
            </RequestDetailsSectionWrapper>
          );
        })}
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <RequestDetailsSectionWrapper title="Upload Documents" icon={<BriefcaseIcon />}>
            {[...Array(fileInputCount)].map((_, index) => (
              <div className="pt-4">
                <FileInput key={index} name="" />
              </div>
            ))}
            <div className="flex justify-between w-full mt-4">
              <Button
                color="ghost"
                size="fit"
                className="my-4 text-foreground-5"
                onClick={handleAddDocument}
              >
                <PlusCircle size={20} />
                Add Document
              </Button>

              <div>
                <Button type="submit">Send To Sidebrief</Button>
              </div>
            </div>
          </RequestDetailsSectionWrapper>
        </form> */}
      </div>
    </div>
  );
};

export default page;
