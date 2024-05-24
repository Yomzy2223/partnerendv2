import { EmptyContentSvg } from "@/assets/svg";
import Image from "next/image";
import React, { ReactNode } from "react";

const DoChecks = ({
  children,
  items,
  errorText,
  emptyText,
  className,
  isLoading,
  Skeleton,
}: {
  children: ReactNode;
  items: any[];
  errorText?: string;
  emptyText?: string;
  className?: string;
  isLoading?: boolean;
  Skeleton?: any;
}) => {
  if (isLoading) return <div className={className}>{Skeleton}</div>;

  if (errorText) return <p>{errorText}</p>;

  if (items?.length === 0)
    return (
      <div className="m-auto w-max my-10">
        <Image src={EmptyContentSvg} alt="empty" className="m-auto" />
        <p className="sb-text-20 text-center">{emptyText}</p>
      </div>
    );

  return <div className={className}>{children}</div>;
};

export default DoChecks;
