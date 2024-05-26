import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useUpdateBusinessInfoMutation } from "@/services/tasks";
import { Button } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";
import { Oval } from "react-loading-icons";
import DynamicForm from "../dynamicForm";
import { formInfo, formSchema, formType } from "./constants";

const BusinessInfoForm = ({
  open,
  setOpen,
  businessId,
  onSubmit,
  isPending,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  businessId: string;
  onSubmit: () => void;
  isPending: boolean;
}) => {
  const updateBusinessInfo = useUpdateBusinessInfoMutation();

  const submitBusinessInfo = ({ values }: { values: formType }) => {
    updateBusinessInfo.mutate(
      { id: businessId, formInfo: values },
      {
        onSuccess: () => onSubmit && onSubmit(),
      }
    );
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title="Update Company/Business Information"
      size="2xl"
      classNames={{
        header: "[&_h3]:flex [&_h3]:flex-1 [&_h3]:justify-center",
        body: "min-h-max",
      }}
      dismissible
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={{}}
        formSchema={formSchema}
        onFormSubmit={submitBusinessInfo}
        className="gap-4"
      >
        <Button
          type="submit"
          color="secondary"
          isProcessing={updateBusinessInfo.isPending || isPending}
          disabled={updateBusinessInfo.isPending || isPending}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
          className="self-end"
        >
          Submit
        </Button>
      </DynamicForm>
    </DialogWrapper>
  );
};

export default BusinessInfoForm;
