import ConfirmAction from "@/components/confirmAction";
import { FileInput } from "@/components/file/fileInput";
import BusinessInfoForm from "@/components/form/businessInfoForm";
import { uploadFileToCloudinary, useGlobalFunctions } from "@/hooks/globalFunctions";
import {
  useCreateUserDocMutation,
  useDeleteUserDocMutation,
  useGetUserDocQuery,
  useGetUserRequestDocQuery,
} from "@/services/users";
import { TUserDocGet } from "@/services/users/types";
import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DocSection = ({
  businessId,
  requestId,
  priority,
  companyName,
}: {
  businessId: string;
  requestId: string;
  priority?: number;
  companyName: string;
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [newInstance, setNewInstance] = useState(false);

  const [existingFiles, setExistingFiles] = useState<TUserDocGet[]>([]);
  const [deleteId, setDeleteId] = useState("");

  const createUserDoc = useCreateUserDocMutation();
  const deleteUserDoc = useDeleteUserDocMutation();
  const userDocRes = useGetUserRequestDocQuery({ requestId });
  const userDoc = userDocRes.data?.data?.data || [];

  const { userCloudFolder } = useGlobalFunctions();
  const session = useSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
    if (userDoc?.length > 0) {
      setExistingFiles(userDoc);
    }
  }, [userDoc]);

  useEffect(() => {
    if (files.length === 0) setNewInstance(true);
  }, [files]);

  const submitFiles = async () => {
    let resArray: any[] = [];

    try {
      setIsUploading(true);
      resArray = await Promise.all(
        files.map(async (file, i: number) => {
          let response = {
            userId,
            requestId,
            name: "",
            link: "",
            type: "",
            size: "",
          };
          const uploadRes = await uploadFileToCloudinary({
            file,
            folderName: userCloudFolder,
          });
          response.name = uploadRes.data?.original_filename;
          response.link = uploadRes.data?.secure_url;
          response.type = uploadRes.data?.secure_url.split(".").pop();
          response.size = uploadRes.data?.bytes?.toString();

          return response;
        })
      );
      setIsUploading(false);
    } catch (err) {
      console.log(err);
      setIsUploading(false);
    }

    if (resArray?.length > 0) {
      await Promise.all(
        resArray.map((res) => {
          createUserDoc.mutate({ formInfo: res });
        })
      );
    }
  };

  const deleteDocument = () => {
    deleteUserDoc.mutate(deleteId, {
      onSuccess: () => setDeleteId(""),
    });
  };

  console.log(existingFiles);
  console.log(files);
  return (
    <div className="flex flex-col justify-end gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {existingFiles.map((file, i) => (
            <FileInput
              key={i}
              fileLink={file.link}
              fileName={file.name}
              fileSize={file.size}
              fileType={file.type}
              editMode={false}
              onFileRemove={() => setDeleteId(file.id)}
              hideRemove={file.isApproved}
            />
          ))}
          {files.map((file, i) => (
            <FileInput
              key={i}
              fileLink=""
              fileName=""
              fileSize=""
              fileType=""
              defaultFile={file}
              onFileChange={(file) => {
                setFiles([...files, file]);
                setNewInstance(false);
              }}
              onFileRemove={(file) => setFiles(files.filter((each) => each !== file))}
            />
          ))}
        </div>
        {newInstance && (
          <FileInput
            fileLink=""
            fileName=""
            fileSize=""
            fileType=""
            onFileChange={(file) => {
              setFiles([...files, file]);
              setNewInstance(false);
            }}
            onFileRemove={(file) => setFiles(files.filter((each) => each !== file))}
          />
        )}
        {!newInstance && (
          <Button
            color="ghost"
            size="fit"
            className="my-4 text-foreground-5"
            onClick={() => setNewInstance(true)}
          >
            <PlusCircle size={20} />
            Add Document
          </Button>
        )}
      </div>
      {files.length > 0 && (
        <Button
          color="primary"
          className="self-end"
          onClick={() => (priority === 1 && !companyName ? setOpenForm(true) : submitFiles())}
        >
          Send to Sidebrief
        </Button>
      )}

      <BusinessInfoForm
        open={openForm}
        setOpen={setOpenForm}
        businessId={businessId}
        onSubmit={submitFiles}
        isPending={isUploading || createUserDoc.isPending}
      />
      {!!deleteId && (
        <ConfirmAction
          open={!!deleteId}
          setOpen={(open) => !open && setDeleteId("")}
          confirmAction={deleteDocument}
          title="Remove Document"
          description="Are you sure you want to remove this document? This action is irreversible"
          isLoading={deleteUserDoc.isPending}
          dismissible={!deleteUserDoc.isPending}
          isDelete
        />
      )}
    </div>
  );
};

export default DocSection;
