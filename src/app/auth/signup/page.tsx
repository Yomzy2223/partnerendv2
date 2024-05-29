"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { AuthStepper } from "@/components/stepper/auth";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Oval } from "react-loading-icons";
import * as z from "zod";
import { IFormInput } from "@/components/form/constants";
import { useGetCountries } from "@/services/service";
import { countries, TCountryCode } from "countries-list";
import { useResponse } from "@/services";

const SignUp = () => {
  const [isPending, setIsPending] = useState(false);
  const { push } = useRouter();
  const { handleError, handleSuccess } = useResponse();

  const countriesRes = useGetCountries();
  const countriesData = countriesRes.data?.data.data;
  const countriesNames = countriesData?.map((el) => el.name);

  const worldCountries = Object.keys(countries).map(
    (el: string) => countries[el as TCountryCode].name
  );
  const originalCountries = worldCountries.filter((el) =>
    countriesNames?.find((each) => each.toLowerCase() === el.toLowerCase())
  );

  const handleSignUp = async ({ values }: { values: signUpType }) => {
    setIsPending(true);
    const response = await signIn("signUp", {
      redirect: false,
      fullName: values.name,
      // organization: values.organization,
      // address: values.address,
      email: values.email,
      password: values.password,
      country: values.country,
      isPartner: false,
      isStaff: false,
    });
    setIsPending(false);

    if (response?.error) handleError({ error: response?.error });
    else {
      handleSuccess({ data: "Sign up successfully" });
      push("/");
    }
  };

  const handleSignUpWithGoogle = async () => {
    await signIn("google", { redirect: true });
  };

  const handleSignUpWithYahoo = async () => {
    // const response = await signIn("yahoo");
    // console.log(response);
  };

  const formInfo: IFormInput[] = [
    {
      name: "name",
      label: "Hello, Tell us your name",
      type: "text",
      textInputProp: {
        placeholder: "Enter your name",
      },
    },
    // {
    //   name: "organization",
    //   label: "Registered Organization Name",
    //   type: "text",
    //   textInputProp: {
    //     placeholder: "Enter your organization name",
    //   },
    // },
    {
      name: "email",
      label: "Enter Email Address",
      type: "email",
      textInputProp: {
        placeholder: "Enter your email address",
      },
    },
    {
      name: "password",
      label: "Enter Password",
      type: "password",
      textInputProp: {
        placeholder: "Enter a password",
      },
    },
    // {
    //   name: "address",
    //   label: "Enter Home Address",
    //   type: "text",
    //   textInputProp: {
    //     placeholder: "Home Address",
    //   },
    // },
    {
      name: "country",
      label: "Select Country",
      type: "select",
      selectProp: {
        placeholder: "Select a country",
      },
      options: originalCountries || [],
    },
  ];
  return (
    <AuthFormWrapper
      title="Create an account for free"
      description="Join our 500+ customers to scale your business."
      handlers={{
        google: handleSignUpWithGoogle,
        yahoo: handleSignUpWithYahoo,
      }}
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={signUpSchema}
        onFormSubmit={handleSignUp}
      >
        <p className="text-foreground-3 my-6">
          By Signing up you agree to our{" "}
          <Link href="" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="" className="underline">
            Privacy Policy
          </Link>
        </p>

        <AuthStepper />

        <div className="flex items-center justify-between gap-14">
          <p className="sb-text-16 text-foreground-3">
            Have an account?{" "}
            <Button color="plain" size="fit" className="text-primary" href="/auth/signin">
              Sign In
            </Button>
          </p>
          <Button
            type="submit"
            color="secondary"
            isProcessing={isPending}
            disabled={isPending}
            processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
          >
            Click to create account {!isPending && <ArrowRightCircle className="ml-1" />}
          </Button>
        </div>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default SignUp;

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Enter your first name" }),
  // organization: z.string().min(1, { message: "Enter your organization name" }),
  email: z.string().email("Enter a valid email").min(1, { message: "Enter your email address" }),
  password: z.string().min(6, "Password must be 6 or more characters"),
  country: z.string().min(1, { message: "Select a Country" }),
  // address: z.string().min(1, { message: "Enter your home address" }),
});

type signUpType = z.infer<typeof signUpSchema>;

const defaultValues = {
  name: "",
  // organization: "",
  email: "",
  password: "",
  country: "",
  // address: "",
};
