"use client";
import { useState } from "react";
import { Button } from "flowbite-react";
import { ExternalLink } from "lucide-react";
import React from "react";
import CardWrapper from "../wrappers/cardWrapper";
import { EditProfileModal } from "../profile/EditProfileModal";

const ProfileSummaryCard = ({
  title,
  info,
}: {
  title: string;
  info: string;
}) => {
  const [openModal, setOpenModal] = useState(false);

	const closeModal = () => {
		setOpenModal(false);
	};
  return (
    <div className="bg-primary-8 rounded-lg min-w-[200px] max-w-[300px] h-max">
      <CardWrapper className="flex flex-col justify-between gap-4 bg-primary-8 bg-serviceCardBG rounded-lg w-full h-[158px]">
        <div>
          <p className="sb-text-24 font-semibold mb-2">{title}</p>
          <p className="text-sm font-normal text-foreground-5">{info}</p>
        </div>
        <Button size="fit" color="ghost" className="w-max" onClick={() => setOpenModal(true)}>
          <span className="text-sm font-normal mr-2">Edit profile</span>{" "}
          <ExternalLink size={16} />
        </Button>
      </CardWrapper>
      <EditProfileModal open={openModal} close={closeModal}/> 
    </div>
  );
};

export default ProfileSummaryCard;
