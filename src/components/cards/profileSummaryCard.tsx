"use client";

import { Button } from "flowbite-react";
import { ExternalLink, Link2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import CardWrapper from "../wrappers/cardWrapper";

const ProfileSummaryCard = ({
  title,
  info,
}: {
  title: string;
  info: string;
}) => {
  const { push } = useRouter();
  const { service } = useParams();
  console.log(service);

  return (
    <div className="bg-primary-8 rounded-lg">
      <CardWrapper
        className="flex flex-col justify-between gap-4 bg-primary-8 bg-serviceCardBG rounded-lg w-full min-w-[200px] max-w-[300px] h-[158px]"
        onClick={() => push(service.toString() + "/products")}
      >
        <div>
          <p className="sb-text-24 font-semibold mb-2">{title}</p>
          <p className="text-sm font-normal text-foreground-5">{info}</p>
        </div>
        <Button size="fit" color="ghost" className="w-max">
          <span className="text-sm font-normal mr-2">Edit profile</span>{" "}
          <ExternalLink size={16} />
        </Button>
      </CardWrapper>
    </div>
  );
};

export default ProfileSummaryCard;
