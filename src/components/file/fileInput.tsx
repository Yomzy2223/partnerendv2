// "use client";

// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { Upload } from "@/assets/icons";
// import { cn } from "@/lib/utils";
// import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";
// import { Button } from "flowbite-react";
// import { DownloadIcon, PenIcon, PenLineIcon } from "lucide-react";
// import { saveAs } from "file-saver";

// export const FileInput = ({
//   fileName,
//   fileLink,
//   onFileChange,
//   editMode = true,
//   fileType,
// }: {
//   fileName: string;
//   fileLink?: string;
//   fileType?: string;
//   onFileChange?: (file: File) => void;
//   editMode?: boolean;
// }) => {
//   const [file, setFile] = useState<File>();

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFile(acceptedFiles[0]);
//     // onFileChange(acceptedFiles[0]);
//   }, []);

//   const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//     noClick: !!file,
//     noKeyboard: !!file,
//     accept: {
//       "application/msword": [],
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//         [],
//     },
//     disabled: !editMode,
//   });

//   const fileExtension = file?.name.split(".").pop() || fileType;

//   let fileSize: string | number = Math.ceil(file?.size ? file?.size / 1000 : 0);
//   if (fileSize >= 1000) fileSize = (fileSize / 1000).toFixed(2) + "MB";
//   else fileSize = fileSize + "KB";

//   return (
//     <div
//       {...getRootProps({})}
//       className={cn(
//         "bg-gray-50 px-8 py-4 cursor-pointer rounded-lg border-2 border-gray-200 border-dashed flex flex-col gap-2 items-center justify-center",
//         {
//           "border-solid cursor-default p-2": file || fileName,
//         }
//       )}
//     >
//       <input {...getInputProps({})} />
//       {!file && !fileName && !fileLink ? (
//         editMode ? (
//           <>
//             <Upload />
//             {isDragActive ? (
//               <p className="text-gray-500 text-sm leading-normal">
//                 Drop the files here ...
//               </p>
//             ) : (
//               <div className="flex flex-col items-center">
//                 <p className="text-gray-500 text-sm leading-normal">
//                   Drag files here to upload
//                 </p>
//                 <p className="underline text-xs leading-normal text-primary">
//                   or browse for files
//                 </p>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="flex items-center gap-1 text-gray-500 text-sm leading-normal">
//             Click edit button below to upload a file {<PenLineIcon size={15} />}
//           </p>
//         )
//       ) : (
//         <div className="flex w-full justify-between">
//           <div
//             className={cn("flex items-center space-x-3", {
//               "text-foreground-5": !editMode,
//             })}
//           >
//             <div className="w-4 h-4">
//               <FileIcon
//                 extension={fileExtension}
//                 {...defaultStyles[fileExtension as DefaultExtensionType]}
//                 glyphColor={`${fileExtension === "pdf" && "red"}`}
//               />
//             </div>
//             <div>
//               <p className="text-sm underline">{file?.name || fileName}</p>
//               <p className="text-xs">{fileSize || fileLink}</p>
//             </div>
//           </div>
//           {(file || fileLink) && (
//             <div className="flex items-center gap-4">
//               {/* {editMode && (
//                 <Button color="link" size="fit" onClick={open}>
//                   <PenIcon size={18} />
//                 </Button>
//               )}
//               <Button
//                 color="link"
//                 size="fit"
//                 onClick={() => saveAs(file || fileLink, file?.name || fileName)}
//               >
//                 <DownloadIcon size={18} />
//               </Button> */}
//               { editMode &&  (
//                 <p className="cursor-pointer text-primary">Change</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/flowbite";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";

export const FileInput = ({ name }: { name: string }) => {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: !!file,
    noKeyboard: !!file,
  });

  const fileExtension = file?.name.split(".").pop();

  return (
    <div>
      <p className="text-sm font-medium leading-normal">{name}</p>
      <div
        {...getRootProps({})}
        className={cn(
          "bg-gray-50 px-8 py-4 cursor-pointer rounded-lg border-2 border-gray-200 border-dashed flex flex-col gap-2 items-center justify-center",
          {
            "border-solid cursor-default": !!file,
          }
        )}
      >
        <input {...getInputProps({})} />
        {!file ? (
          <>
            <Upload />
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm leading-normal">
                Drag files here to upload
              </p>
              <p className="underline text-xs leading-normal text-primary">
                or browse for files
              </p>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-between">
            <div className="flex space-x-3">
              <div className="w-5 h-5">
                <FileIcon
                  extension={fileExtension}
                  {...defaultStyles[fileExtension as DefaultExtensionType]}
                  glyphColor={`${fileExtension === "pdf" && "red"}`}
                />
              </div>
              <p className={"underline"}>{file.name}</p>
            </div>
            <Button color="link" size={"fit"} onClick={open}>
              <p>Change</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

