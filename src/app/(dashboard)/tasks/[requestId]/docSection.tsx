import { FileInput } from "@/components/file/fileInput";
import BusinessInfoForm from "@/components/form/businessInfoForm";
import { uploadFileToCloudinary, useGlobalFunctions } from "@/hooks/globalFunctions";
import { useCreateUserDocMutation } from "@/services/userDocument";
import { Button } from "flowbite-react";
import { PlusCircle, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DocSection = ({ businessId, requestId }: { businessId: string; requestId: string }) => {
  const [openForm, setOpenForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [newInstance, setNewInstance] = useState(false);

  const createUserDoc = useCreateUserDocMutation();

  const { userCloudFolder } = useGlobalFunctions();
  const session = useSession();
  const userId = session.data?.user?.id;

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
            fileName: "",
            fileLink: "",
            fileType: "",
            fileSize: "",
          };
          const uploadRes = await uploadFileToCloudinary({
            file,
            folderName: userCloudFolder,
          });
          response.fileName = uploadRes.data?.original_filename;
          response.fileLink = uploadRes.data?.secure_url;
          response.fileType = uploadRes.data?.secure_url.split(".").pop();
          response.fileSize = uploadRes.data?.bytes?.toString();

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

  return (
    <div className="flex flex-col justify-end gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
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
        <Button color="primary" className="self-end" onClick={() => setOpenForm(true)}>
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
    </div>
  );
};

export default DocSection;
