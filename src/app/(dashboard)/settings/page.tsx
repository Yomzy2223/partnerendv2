import React from "react";
import Image from "next/image";
import { EmptyContentSvg } from "@/assets/svg";

const Settings = () => {
  return (
    <div className="flex flex-col justify-center gap-4 items-center flex-1 w-max my-10 m-auto ">
      <Image src={EmptyContentSvg} alt="empty" />
      <p className="sb-text-20 text-center lowercase first-letter:uppercase">Coming soon!!!</p>
    </div>
  );
};

export default Settings;
