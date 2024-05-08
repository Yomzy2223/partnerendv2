import React from "react";
import Image from "next/image";
import { EmptyContentSvg } from "@/assets/svg";

const Settings = () => {
  return  (
    <div className="flex justify-center items-center">
      <div className="m-auto w-max my-10">
        <Image src={EmptyContentSvg} alt="empty" className="m-auto" />
        <p className="sb-text-20 text-center">No settings preset</p>
      </div>
    </div>
  )
  
  
};

export default Settings;
