import { uploadFileToCloudinary, useGlobalFunctions } from "@/hooks/globalFunctions";
import { sluggify } from "@/lib/utils";
import {
  useGetPartnerReqQA,
  useSavePartnerReqQA,
  useUpdatePartnerReqQA,
} from "@/services/requirementQA";
import {
  TFormQACreate,
  TFormQAGet,
  TReqForm,
  TSubformQACreate,
} from "@/services/requirementQA/types";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { IFormInput } from "../constants";

//
export const useActions = ({ info, handeleSubmit, setIsUploading }: INewFormActionProps) => {
  const { userCloudFolder } = useGlobalFunctions();

  const session = useSession();
  const userId = session.data?.user?.id;

  const saveReqtQA = useSavePartnerReqQA();
  const updateReqQA = useUpdatePartnerReqQA();

  const reqFormQARes = useGetPartnerReqQA({ userId });
  const reqFormQA = reqFormQARes.data?.data?.data;

  const getQAForm = (title?: string) => {
    const activeForm = reqFormQA?.find((el) => el.title === title);
    return activeForm;
  };

  const QAForm = getQAForm(info?.title);

  // Returns the QA for a field
  const getQAField = (question: string) => {
    // const QASubForm = reqFormQA?.subForm;
    const QASubForm = QAForm?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  // Used to construct the form
  let formInfo: IFormInput[] = info?.subForm?.map((field) => {
    const QAField = getQAField(field.question);

    const isTextInput =
      field.type === "email" ||
      field.type === "phone number" ||
      field.type === "paragraph" ||
      field.type === "promocode" ||
      field.type === "short answer";
    const isSelect =
      field.type === "select" ||
      field.type === "countries-all" ||
      field.type === "countries-operation" ||
      field.type === "multiple choice";

    let value = isTextInput || isSelect ? QAField?.answer[0] || "" : QAField?.answer || [];

    // Each field
    return {
      id: field.id,
      name: sluggify(field.question),
      label: field.question,
      type: field.type,
      options: field.options,
      compulsory: field.compulsory,
      dependsOn: field.dependsOn,
      allowOther: field.allowOther,
      placeholder: field.question,
      textInputProp: {
        placeholder: field.question,
      },
      value,
      fileName: QAField?.fileName,
      fileLink: QAField?.fileLink,
      fileType: QAField?.fileType,
      fileSize: QAField?.fileSize,
    };
  });

  // Used to create and update QA form
  const submitFormHandler = async (
    values: Record<any, any>
    // reset: UseFormReset<any>
  ) => {
    if (!info) return;

    const getAnswer = (question: string) => {
      let answer = values[sluggify(question)];
      if (typeof answer === "number") answer = answer.toString();
      return answer;
    };

    let resArray: TSubformQACreate[] = [];

    try {
      setIsUploading(true);
      resArray = await Promise.all(
        info?.subForm?.map(async (el, i: number) => {
          let file: any = values[sluggify(el.question)];
          let isANewFile: boolean = file instanceof File;

          let response = {
            id: getQAField(el.question)?.id,
            question: el.question,
            answer: getAnswer(el.question) || "",
            type: el.type,
            compulsory: el.compulsory,
            fileName: "",
            fileLink: "",
            fileType: "",
            fileSize: "",
          };
          if (isANewFile) {
            // If it's a new files, then upload them to cloudinary
            const uploadRes = await uploadFileToCloudinary({
              file: values[sluggify(el.question)],
              folderName: userCloudFolder,
            });
            response.fileName = uploadRes.data?.original_filename;
            response.fileLink = uploadRes.data?.secure_url;
            response.fileType = uploadRes.data?.secure_url.split(".").pop();
            response.fileSize = uploadRes.data?.bytes?.toString();
          } else {
            // If it's not a new file, then set back the old file
            response.fileName = file?.fileName || "";
            response.fileLink = file?.fileLink || "";
            response.fileType = file?.fileType || "";
            response.fileSize = file?.fileSize || "";
          }

          return response;
        })
      );
      setIsUploading(false);
    } catch (err) {
      console.log(err);
      setIsUploading(false);
    }

    const payload: TFormQACreate = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: false,
      subForm: resArray,
    };
    console.log(payload);

    if (QAForm?.id) {
      updateReqQA.mutate(
        { id: QAForm.id, form: payload },
        {
          onSuccess: (data) => {
            handeleSubmit();
            console.log("Updated req form");
          },
        }
      );
      return;
    }
    saveReqtQA.mutate(
      { userId, form: payload },
      {
        onSuccess: (data) => {
          handeleSubmit();
          console.log("Created req form");
        },
      }
    );
  };

  const isPending = saveReqtQA.isPending || updateReqQA.isPending;

  return { submitFormHandler, isPending, formInfo, reqFormQA };
};

interface INewFormActionProps {
  info: TReqForm;
  QAForm?: TFormQAGet;
  handeleSubmit: () => void;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  // form: UseFormReturn<any, any, undefined>;
}
