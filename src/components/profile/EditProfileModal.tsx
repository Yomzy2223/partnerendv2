import React, {useState} from 'react'
import { Modal, Button } from "@/components/flowbite";
import Profile from './profile';
import  ProfileForm  from "./ProfileForm"; 
import { ProfileSchema } from "./constants"

export const EditProfileModal = ({
    open,
    close,
}: {
    open: boolean;
    close: () => void
}) => {

    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleSubmit = (values: any) => {
        console.log(values);
        handleNext()
    };

    const renderModalContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <Modal.Header>Edit Profile</Modal.Header>
                        <Modal.Body>
                            <ProfileForm
                                formInfo={formInfo}
                                defaultValues={defaultValues}
                                formSchema={ProfileSchema}
                                onFormSubmit={handleSubmit}
                            >
                                <div className="flex items-center justify-end gap-x-6 border-gray-900/10 px-4 py-4 sm:px-8">
                                    <Button
                                        className="text-sm font-semibold leading-6 text-dark bg-transparent hover:bg-transparent"
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </ProfileForm>
                        </Modal.Body>
                    </>
                );

            case 2:
                return (
                    <>
                        <Modal.Header>Documents</Modal.Header>
                        <Modal.Body>
                            <ProfileForm
                                formInfo={documentsSubmitted}
                                defaultValues={defaultValues}
                                formSchema={ProfileSchema}
                                onFormSubmit={handleSubmit}

                            >
                                <div className="flex items-center justify-end gap-x-6 border-gray-900/10 px-4 py-4 sm:px-8">
                                    <Button
                                        className="text-sm font-semibold leading-6 text-dark bg-transparent hover:bg-transparent"
                                        onClick={() => setCurrentStep(1)}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white"
                                    >
                                        Update
                                    </Button>
                                </div>
                            </ProfileForm>
                        </Modal.Body>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={open} onClose={close} size={"4xl"} >
            {renderModalContent()}
        </Modal>
    )
}

const defaultValues = {
    location: "",
    name: "",
    email: "",
    phoneNumber:"",
    payRange:""
  };
  

  const formInfo = [
    {
      name: "location",
      label: "Where do you practice?",
      type: "select",
      selectOptions: [
        "Kenya",
        "Nigeria",
        "Ghana",
        "South Africa",
        "Tanzania",
      ],
      textInputProp: {
        placeholder: "Select Country",
      },
    }, 
  
    {
      name:"name",
      label:"Full Name",
      type:"text",
      textInputProp: {
        placeholder: "Enter your full name",
      },
  
    }, 
  
    {
      name:"email",
      label:"Email Address",
      type:"email",
      textInputProp: {
        placeholder: "Enter your email address",
      },
    },
  
    {
      name:"phoneNumber",
      label:"Phone Number",
      type:"text",
      textInputProp: {
        placeholder: "Enter your phone number",
      },
    },
  
    {
      name:"payRange",
      label:"Pay range",
      type:"text",
      textInputProp: {
        placeholder: "Enter your pay range",
      },
    },
  ]

  const documentsSubmitted = [
    {
        name:"certificate",
        label:"Certificate",
        type:"file"
    
    },


  ]  
  