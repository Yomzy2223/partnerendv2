"use client"
import React, {useState} from "react";
import { Button } from "@/components/flowbite"
import  ProfileForm  from "./ProfileForm"; 
import { ProfileSchema } from "./constants"
import { EditProfileModal } from "./EditProfileModal";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);

	const closeModal = () => {
		setOpenModal(false);
	};
  
  return (
    <div>
      <Button color="magenta" size={"lg"} className="self-start" onClick={() => setOpenModal(true)}>
					<div className="space-x-2 flex items-center">
						<p>Continue</p>
					</div>
				</Button>

        <EditProfileModal open={openModal} close={closeModal}/> 
    </div>
  )
};

export default Profile;


