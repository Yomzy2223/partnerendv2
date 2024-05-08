import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import useMediaQuery from "./useMediaQuery";
import { useSession } from "next-auth/react"
// import { saveAs } from "file-saver";

export const useGlobalFunctions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 800px)");
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  
  const session = useSession();
  const userCloudFolder = session.data?.user?.fullName + "-" + session.data?.user?.id;

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const newQuery = new URLSearchParams(searchParams.toString());
      newQuery.delete(name);
      router.push(pathname + "?" + newQuery.toString());

      return newQuery.toString();
    },
    [searchParams]
  );

  const setQuery = (name: string, value: string | number) => {
    router.push(pathname + "?" + createQueryString(name, value), {
      scroll: false,
    });
  };

  return {
    createQueryString,
    deleteQueryString,
    setQuery,
    isDesktop,
    userCloudFolder
  };
};

export const uploadFileToCloudinary = async ({
  getProgress,
  file,
}: {
  file: File;
  getProgress: (e: number) => void;
}) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/raw/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
  );
  formData.append("folder", "App V2");

  return await axios.post(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        getProgress(percentCompleted);
      }
    },
  });
};


