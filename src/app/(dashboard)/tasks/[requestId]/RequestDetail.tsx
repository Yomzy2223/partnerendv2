"use client"
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useActions } from "../(status)/actions";
import { Puff } from "react-loading-icons";
import PersonsCard from "@/components/cards/personsCard";
import { cn, sluggify } from "@/lib/utils";
import RequestDetailsSectionWrapper from "@/components/wrappers/requestDetailsSectionWrapper";
import TextWithDetails from "@/components/texts/textWithDetails";
import { BriefcaseIcon, Divide, PiggyBankIcon } from "lucide-react";
import React from "react";
import { FileInput } from "@/components/file/fileInput";
import { FileInputMod } from "@/components/file/fileInput2";
import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import { useAction, isFileType } from "./actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDynamic } from "@/hooks/useDynamic";
import { uploadFileToCloudinary } from "@/hooks/globalFunctions";
import { UseFormSetValue } from "react-hook-form";
import { LucideIcon } from "lucide-react";

type productSubFormType = {
  id: string;
  question: string;
  type: string;
  options: string[];
  formId: string;
  compulsory: true;
  fileName: string | null;
  fileLink: string | null;
  fileType: string | null;
  fileSize: string | null;
  allowOther: boolean;
  documentType: string;
  dependsOn: {
    field: string;
    options: string[];
  };
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
};

interface FieldType {
  id?: string;
  type: string;
  question?: string;
  icon?: LucideIcon;
  compulsory?: boolean;
  options?: string[];
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  allowOther?: boolean;
  documentType?: string;
}

interface IProps {
  info: FieldType;
  isEdit?: boolean;
  isNew?: boolean;
  submitHandler: ({
    values,
    setEdit,
  }: {
    values: { [x: string]: any };
    setEdit: Dispatch<SetStateAction<boolean>>;
  }) => void;
}

const getDynamicFieldSchema = ({
  type,
  hasSelectedFile,
}: {
  type?: string;
  hasSelectedFile: boolean;
}) => {
  let schema: any = {
    question: z
      .string({ required_error: "Enter field / field title" })
      .min(3, { message: "Must be at least 3 characters" }),
    type: z
      .string({ required_error: "Select type" })
      .min(1, { message: "Select type" }),
    compulsory: z.boolean(),
    dependsOn: z.object({
      field: z.string().nullable(),
      options: z.string().array(),
    }),
    allowOther: z.boolean(),
  };

  if (type === "checkbox" || type === "objectives") {
    schema = {
      ...schema,
      options: z
        .string({ required_error: "Option cannot be empty" })
        .array()
        .nonempty({ message: "Enter at least 1 option" })
        .refine(
          (options) => {
            return !options.some((el) => el.trim() === "");
          },
          { message: "Option cannot be empty" }
        ),
    };
  }

  if (type === "document template" || type === "document upload") {
    schema = {
      ...schema,
      documentType: z
        .string({ required_error: "Select document type" })
        .min(3, { message: "Select document type" }),
    };
  }

  if (type === "document template") {
    hasSelectedFile
      ? (schema = {
          ...schema,
          documentTemp: z
            .instanceof(File, { message: "Kindly upload a valid file" })
            .refine((file) => file, { message: "Kindly upload a file" })
            .refine((file) => file.size <= 1024 * 1024, {
              message: "File size must be less than 1MB",
            }),
        })
      : (schema = {
          ...schema,
          fileName: z.string(),
          fileLink: z.string(),
          fileType: z.string(),
        });
  }

  return z.object(schema);
};



const TaskDetails = ({
  info,
  isEdit,
  isNew,
  submitHandler,
}: IProps ) => {
  const { requestId } = useParams();
  const [edit, setEdit] = useState(isNew || false);
  const [type, setType] = useState(info?.type);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  
  const [fileInputCount, setFileInputCount] = useState(1);
  const { eachRequestDetails } = useActions();
  console.log("eachRequestDetails", eachRequestDetails)

  const requestDetails = eachRequestDetails?.data?.data;

  console.log("requestDetails", requestDetails);

  

  const formSchema = getDynamicFieldSchema({
    type,
    hasSelectedFile,
  });

  type formType = z.infer<typeof formSchema>;

  const handleSubmit = async () => {
    // ... other form submission logic ...
  
    if (selectedFile) {
      try {
        const progressCallback = (percent) => {
          // Update UI to display upload progress (optional)
          console.log('Upload progress:', percent);
        };
  
        const response = await uploadFileToCloudinary({
          file: selectedFile,
          getProgress: progressCallback,
        });
  
        const cloudinaryUrl = response.data.secure_url; // Extract the file URL
  
        // Update your form data or state with the Cloudinary URL
        const updatedForm = {
          // ... your existing form data
          cloudinaryUrl,
        };
  
        // Submit the updated form (replace with your submission logic)
        await submitForm(updatedForm);
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        // Handle upload errors gracefully (e.g., display error message)
      }
    } else {
      // Handle the case where no file is selected (optional)
    }
  };

  async function onSubmit(values: formType) {
    const file = values?.documentTemp;
    if (file) {
      const response = await uploadFileToCloudinary({
        file,
        getProgress: (progress) => {
          setUploadProgress(progress);
        },
      });
      const data = response?.data;
      if (data) {
        const newValues = {
          ...values,
          fileName: data.original_filename,
          fileLink: data.secure_url,
          fileType: data.secure_url.split(".").pop(),
        };
        submitHandler({ values: newValues, setEdit });
      }
      return;
    }

    
    if (values?.fileName && values?.fileLink && values?.fileType) {
      const newValues = {
        ...values,
        fileName: values.fileName,
        fileLink: values.fileLink,
        fileType: values.fileType,
      };
      submitHandler({ values: newValues, setEdit });
      return;
    }

    submitHandler({ values, setEdit });
  }
  
  const handleAddDocument = () => {
    setFileInputCount(fileInputCount + 1);
  };

  return (
    <div>
      <div className="flex flex-col gap-8">
      <RequestDetailsSectionWrapper
        title="Business Information"
        icon={<BriefcaseIcon />}
        raiseIssueAction={() => {}}
        className="flex flex-col gap-6"
      >
        <TextWithDetails 
            title="Operational Country" 
            // list={["Nigeria"]} 
            text={requestDetails?.product.country}
        />
        <TextWithDetails
          title="Product Type"
          text={requestDetails?.currentState}
        />{" "}
        
      </RequestDetailsSectionWrapper>


      <RequestDetailsSectionWrapper
        title="Upload Documents"
        icon={<BriefcaseIcon />}
      >
        
        {[...Array(fileInputCount)].map((_, index) => (
          <div className="pt-4">
              <FileInput key={index} name="" />
          </div>
          
        ))}

        <Button color="ghost" size="fit" className="my-4 text-foreground-5" onClick={handleAddDocument}>
          <PlusCircle size={20} />
          Add Document
        </Button>
        
      </RequestDetailsSectionWrapper>
      <div>
        <Button >
          Send To Sidebrief
        </Button>
      </div>
    </div>
    
  </div>
  
  );
};

export default TaskDetails;

