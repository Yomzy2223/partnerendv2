"use client";

import { Button, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import { useActions } from "./actions";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { useState } from "react";
import { TFormQAGet, TReqForm } from "@/services/requirementQA/types";

const EachForm = ({ info, isLoading, handeleSubmit }: IEachFormComp) => {
  const [isUploading, setIsUploading] = useState(false);

  const { submitFormHandler, formInfo, isPending, reqFormQA } = useActions({
    info,
    handeleSubmit,
    setIsUploading,
  });

  return (
    <DynamicForm
      formInfo={formInfo}
      onFormSubmit={({ values, reset }) => submitFormHandler(values)}
      className="gap-6"
      formClassName="gap-12 justify-between"
      fullFormInfo={info?.subForm}
    >
      <div className="flex justify-between gap-6">
        <Button
          color="secondary"
          size="lg"
          type="submit"
          isProcessing={isPending || isUploading}
          disabled={isPending || isUploading}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          <div className="space-x-2 flex items-center">
            {(reqFormQA?.length ?? 0) > 0 ? <p>Update</p> : <p>Submit</p>}
          </div>
        </Button>
      </div>
    </DynamicForm>
  );
};

export default EachForm;

interface IEachFormComp {
  info: TReqForm;
  isLoading: boolean;
  handeleSubmit: () => void;
}
