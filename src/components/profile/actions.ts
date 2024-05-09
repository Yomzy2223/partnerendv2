import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { boolean, z } from "zod";
// import { FieldType, IDependsOn } from "../types";

export const useFormFieldActions = ({
  number,
  setValue,
  edit,
  setEdit,
  setType,
  fieldsEditState,
  setFieldsEditState,
}: {
  number: number;
  edit: boolean;
  setValue: UseFormSetValue<{ [x: string]: any }>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<string>>;
  fieldsEditState: { number: number; edit: boolean }[];
  setFieldsEditState: Dispatch<
    SetStateAction<{ number: number; edit: boolean }[]>
  >;
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [compulsory, setCompulsory] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [fileType, setFileType] = useState("");

  const mountInfo = (info: FieldType) => {
    // Set question
    const question = info.question || "";
    setValue("question", question);

    // Set type
    const type = info.type || "";
    setType(type);
    setValue("type", type);

    // Set options
    const options = info.options || [];
    setOptions(options);
    setValue("options", options);

    // Set compulsory
    const compulsory = info.compulsory || false;
    setCompulsory(compulsory);
    setValue("compulsory", compulsory);

    // Set file name
    const fileName = info.fileName || "";
    setFileName(fileName);
    setValue("fileName", fileName);

    // Set file link
    const fileLink = info.fileLink || "";
    setFileLink(fileLink);
    setValue("fileLink", fileLink);

    // Set file type
    const fileType = info.fileType || "";
    setFileType(fileType);
    setValue("fileType", fileType);

  };


  // Update the edit state of each field in the form action
  useEffect(() => {
    const exists = fieldsEditState.find((el) => el.number === number);
    if (exists) {
      const newEditState = fieldsEditState.map((el) =>
        el.number === number ? { number, edit } : el
      );
      setFieldsEditState(newEditState);
    } else {
      setFieldsEditState([...fieldsEditState, { number, edit }]);
    }
  }, [edit]);

  ;

  
  

  return {
    setType,
    options,
    setOptions,
    fileName,
    fileLink,
    compulsory,
    setCompulsory,
    // dependsOn,
    // setDependsOn,
    // allowOther,
    // setAllowOther,
    // fileType,
    // mountInfo
  };
};

export type fieldReturnType = ReturnType<typeof useFormFieldActions>;

export const getDynamicFieldSchema = ({
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