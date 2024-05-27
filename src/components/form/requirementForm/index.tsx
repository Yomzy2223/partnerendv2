"use client";

import DoChecks from "@/components/DoChecks";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { TFormQAGet, TReqForm } from "@/services/requirementQA/types";
import { Tabs, TabsRef } from "flowbite-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import EachForm from "./eachForm";

const RequirementForm = ({
  forms,
  open,
  setOpen,
}: {
  forms: TReqForm[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsRef = useRef<TabsRef>(null);

  // Navigate to the next form if not on the last form. Next page, if otherwise
  const isOnLastForm = forms.length - 1 === activeTab;

  const handeNext = (i: number) => {
    if (isOnLastForm) {
      setOpen(false);
      return;
    }
    tabsRef.current?.setActiveTab(i + 1); // Navigate to the next tab
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title="Verification Form"
      size={forms.length > 1 ? "5xl" : ""}
      dismissible={false}
    >
      <DoChecks
        items={forms}
        emptyText="Sorry, we currently do not support your country"
        textClassName="!sb-text-16"
      >
        <div className="flex flex-col gap-2 max-w-[600px] w-full">
          {forms.length > 1 ? (
            <Tabs
              aria-label="Form tabs"
              style="underline"
              ref={tabsRef}
              onActiveTabChange={(tabs) => setActiveTab(tabs)}
            >
              {forms.map((el, i) => {
                return (
                  <Tabs.Item key={el.id} active={i === activeTab} title={el.title}>
                    <div className="space-y-5 w-full">
                      <div className="flex flex-col">
                        <h6 className="text-2xl leading-normal font-semibold">{el.title}</h6>
                        <p className="font-medium leading-normal text-primary">{el.description}</p>
                      </div>
                      <EachForm info={el} isLoading={false} handeleSubmit={() => handeNext(i)} />
                    </div>
                  </Tabs.Item>
                );
              })}
            </Tabs>
          ) : (
            <div className="space-y-5 w-full">
              <div className="flex flex-col">
                <h6 className="text-2xl leading-normal font-semibold">{forms[0]?.title}</h6>
                <p className="font-medium leading-normal text-primary">{forms[0]?.description}</p>
              </div>
              <EachForm info={forms[0]} isLoading={false} handeleSubmit={() => handeNext(0)} />
            </div>
          )}
        </div>
      </DoChecks>
    </DialogWrapper>
  );
};

export default RequirementForm;
