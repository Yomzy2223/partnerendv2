import React, { useState, Dispatch, ReactNode, useEffect } from "react";
import { Modal, Button } from "@/components/flowbite";
import Profile from "./profile";
import ProfileForm from "./ProfileForm";
import { ProfileSchema } from "./constants";
import { Puff } from "react-loading-icons";
import { FileInput } from "../file/fileInput";
import useCountryApi from "@/hooks/useCountryApi";
import { CountryTypes } from "@/types/type";

export const EditProfileModal = ({
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
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countriesData, setCountries] = useState<string[]>([]);
  const { getAllCountriesQuery } = useCountryApi();
  const { data: countries } = getAllCountriesQuery;

  const countryList = countries?.data.data;

  const countryNames: string[] =
    countryList?.map((country: CountryTypes) => {
      const name = country.name;
      return name.charAt(0).toUpperCase() + name.slice(1);
    }) || [];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countries;
        setCountries(response?.data?.data || []);
        console.log("responses countries", response);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleNext = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    handleNext();
  };

  const formInfo = [
    {
      name: "location",
      label: "Where do you practice?",
      type: "select",
      selectOptions: countryNames,
      textInputProp: {
        placeholder: "Select Country",
      },
    },

    {
      name: "name",
      label: "Full Name",
      type: "text",
      textInputProp: {
        placeholder: "Enter your full name",
      },
    },

    {
      name: "email",
      label: "Email Address",
      type: "email",
      textInputProp: {
        placeholder: "Enter your email address",
      },
    },

    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      textInputProp: {
        placeholder: "Enter your phone number",
      },
    },

    {
      name: "payRange",
      label: "Pay range",
      type: "text",
      textInputProp: {
        placeholder: "Enter your pay range",
      },
    },

    {
      name: "certificate",
      label: "Certificate",
      type: "file",
    },
  ];
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
    <Modal show={open} onClose={close} size={"4xl"}>
      {renderModalContent()}
    </Modal>
  );
};

const defaultValues = {
  location: "",
  name: "",
  email: "",
  phoneNumber: "",
  payRange: "",
};

const documentsSubmitted = [
  {
    name: "certificate",
    label: "Certificate",
    type: "file",
  },
];
