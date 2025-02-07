"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, Select } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import StatusAlert from "./StatusAlert";
import { useEffect, useState } from "react";
import { useGetPartnerReqQA } from "@/services/requirementQA";
import { useSession } from "next-auth/react";

export const Navigation = ({ navRoutes, className, inactiveClassName = "" }: propTypes) => {
  const [openAlert, setOpenAlert] = useState(false);

  const session = useSession();
  const user = session.data?.user;
  const userId = user?.id;

  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const partnerReqQARes = useGetPartnerReqQA({ userId });
  const partnerReqQA = partnerReqQARes.data?.data?.data;
  const hasSubmittedQA = (partnerReqQA?.length ?? 0) > 0;

  useEffect(() => {
    if (partnerReqQARes.isSuccess) {
      if (user?.partnerStatus !== "ACTIVATED") setOpenAlert(true);
    }
  }, [partnerReqQARes.isSuccess]);

  return (
    <div
      className={cn(
        "flex gap-2 max-w-full overflow-auto p-1 px-5 md:px-8 md:py-5 md:gap-4",
        className
      )}
    >
      {navRoutes.map((el, i) => {
        let isActive = i === 0 ? el.to === pathname : pathname.includes(el.to);
        isActive =
          el.type === "select" && el.options
            ? el.options.some((each) => pathname.includes(each.to))
            : isActive;

        return (
          <div key={i}>
            {el?.type === "select" && el?.options ? (
              <Select
                className={cn(
                  "[&_select]:!bg-transparent [&_select]:border-none rounded-lg min-w-max whitespace-nowrap",
                  {
                    "bg-primary [&_select]:text-primary-foreground": isActive,
                    [inactiveClassName]: !isActive,
                  }
                )}
                onChange={(el) => router.push("/" + el.target.value.toLowerCase())}
              >
                {el.options.map((each) => (
                  <option key={each.name} onMouseDown={() => console.log("You clicked")}>
                    {each.name}
                  </option>
                ))}
              </Select>
            ) : (
              <Link href={el.to}>
                <Button
                  color="ghost"
                  className={cn("text-foreground-3 whitespace-nowrap", {
                    "bg-primary text-primary-foreground": isActive,
                    [inactiveClassName]: !isActive,
                  })}
                >
                  {el.name}
                </Button>
              </Link>
            )}
          </div>
        );
      })}
      {isHome && openAlert && (
        <StatusAlert
          hasSubmittedQA={hasSubmittedQA}
          setOpenAlert={setOpenAlert}
          partnerStatus={user?.partnerStatus}
        />
      )}
    </div>
  );
};

interface propTypes {
  navRoutes: {
    name: string;
    to: string;
    type?: string;
    options?: { name: string; to: string }[];
  }[];
  className?: string;
  inactiveClassName?: string;
}
