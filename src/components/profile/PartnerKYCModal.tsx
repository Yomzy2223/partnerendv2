import React, { useState, Dispatch, ReactNode, SetStateAction } from "react";
import { Modal, Button } from "@/components/flowbite";
import Profile from './profile';
import  ProfileForm  from "./ProfileForm"; 
import { ProfileSchema } from "./constants"
import { Puff } from "react-loading-icons";
import PartnerDocumentUpload from "./PartnerDocumentUpload";
import { FileInput } from "../file/fileInput";
import { getDynamicFieldSchema } from "./actions";


export const PartnerKYCModal = ({
    title,
    description,
    isLoading,
    open,
    close,
}: {
    title?: string;
    description?: string;
    children?: ReactNode;
    open: boolean;
    close: () => void;
    isLoading?: boolean;
}) => {
    const handleFileChange = (file: File) => {
    setHasSelectedFile(true);
    setValue("documentTemp", file);
  };
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setCurrentStep((prevStep) => prevStep + 1);
        
    };

    const handleSubmit =  async (values: any) => {
        console.log(values);
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setLoading(false);
        handleNext()
    };

    // const formSchema = getDynamicFieldSchema({
    //     type,
    //     hasSelectedFile,
    //   });
    //   type formType = z.infer<typeof formSchema>;
    const renderModalContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <Modal.Header>Partner's KYC</Modal.Header>
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

                                        <span>Next</span>
                                    </Button>
                                </div>
                            </ProfileForm>
                        </Modal.Body>
                    </>
                );

            case 2:
                return (
                    <>
                        <Modal.Header>Documents Submitted</Modal.Header>
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
            <Modal.Header>Partner's KYC</Modal.Header>
                <Modal.Body>
                    <h2 className="font-bold text-xl py-6">Welcome Simon Olajide 👋</h2>
                    <p className="font-bold text-md py-0">Please Upload these documents for verifications</p>
                    <h4 className="text-md">Upload documents as appropriate as appropriate, please note each field</h4>
                    {/* <ProfileForm
                        formInfo={formInfo}
                        defaultValues={defaultValues}
                        formSchema={ProfileSchema}
                        onFormSubmit={handleSubmit}
                    >
                        <div className="flex items-center justify-end gap-x-6 border-gray-900/10 px-4 py-4 sm:px-8">
                            
                            <Button
                                type="submit"
                                className="rounded-md bg-magenta px-3 py-2 text-sm font-semibold text-white"
                            >

                                <span>Done</span>
                            </Button>
                        </div>
                    </ProfileForm> */}
                    {/* <PartnerDocumentUpload /> */}
                    {/* <FileInput fileName="National ID" fileType="pdf" fileLink="https://" />
                    <FileInput fileName="E-Passport" fileType="jpg" fileLink="https://"/>
                    <FileInput fileName="Proof Oof Address" fileType="jpeg" fileLink="https://"/>
                    <FileInput fileName="Certificate of funds" fileType="png" fileLink="https://"/> */}
                    <div className="flex flex-row my-4 gap-4">
                        
                       {/* <div className="w-full ">
                        <h3 className="my-3">National Identification Slip</h3>
                            <div className="border border-dashed text-center p-4">
                                <p className="text-gray-500 text-sm leading-normal">
                                Drag files here to upload
                                </p>
                                <p className="underline text-xs leading-normal text-primary">
                                or browse for files
                                </p>
                            </div>
                       </div> */}
                       <div className="w-full">
                            <FileInput name="National Identification"/>
                        
                        </div>
                       
                    </div>
                    <div className="flex flex-row my-4 gap-4">
                        <div className="w-full">
                            <FileInput name=""/>
                        
                        </div>
                        <div className="w-full">
                            <FileInput name="" /> 
                        </div>
                       
                    </div>
                    <div className="flex flex-row my-4 gap-4">
                        <div className="w-full">
                            <FileInput name="Proof Of Address" />
                        
                        </div>
                        <div className="w-full">
                            <FileInput name=""/> 
                        </div>
                       
                    </div>
                </Modal.Body>
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

