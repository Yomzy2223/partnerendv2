import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import React, { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

const CardWrapper = ({
  title,
  children,
  big,
  className,
  onClick,
}: {
  title?: string;
  children: ReactNode;
  big?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 bg-background rounded-lg p-4 shadow-md",
        {
          "p-4 lg:p-6": big,
        },
        className
      )}
      onClick={onClick}
    >
      {title && (
        <div className="flex items-center gap-6 justify-between my-6 px-4">
          <h3 className="sb-text-20 text-foreground-9 font-semibold">
            {title}
          </h3>
          <Button
            color="ghost"
            size="fit"
            className="sb-text-16 text-foreground-5"
          >
            See all
          </Button>
        </div>
      )}

      {children}
    </div>
  );
};

export default CardWrapper;
