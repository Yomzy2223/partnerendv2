"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useSearchParams } from "next/navigation";
import { Oval } from "react-loading-icons";
import { IFormInput } from "@/components/form/constants";
import { useForgotPasswordMutation } from "@/services/users";

const ForgotPassword = () => {
  const [formValue, setformValue] = useState<forgotPasswordType>({ email: "" });

  const { setQuery } = useGlobalFunctions();
  const { mutate, isSuccess, isPending } = useForgotPasswordMutation();

  const searchParams = useSearchParams();
  const email = searchParams.get("verification") || "";

  useEffect(() => {
    if (isSuccess && formValue.email) setQuery("verification", formValue.email);
  }, [isSuccess]);

  const handleForgot = async ({ values }: { values: forgotPasswordType }) => {
    setformValue(values);
    mutate(values.email);
  };

  const handleResend = async () => {};

  const handleGoToEmail = () => {
    window.open(`https://mailto:${email}`, "_blank");
  };

  const emailSnip = email ? email.slice(0, 4) + "......." + email.slice(email.indexOf("@")) : "";

  const description = searchParams.get("verification")
    ? `A password reset link has been sent to your email address ${emailSnip}`
    : "No worries, recovery is seamless 😋";

  return (
    <AuthFormWrapper title="Forgotten password" description={description} hideSocials>
      {!email ? (
        <>
          <DynamicForm
            formInfo={formInfo}
            defaultValues={defaultValues}
            formSchema={forgotPasswordSchema}
            onFormSubmit={handleForgot}
          >
            <Button
              type="submit"
              color="secondary"
              isProcessing={isPending}
              disabled={isPending}
              processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
            >
              <span>Forgot password</span>
              {!isPending && <ArrowRightCircle className="ml-1" />}
            </Button>
          </DynamicForm>
          <div className="mt-10">
            <span className="sb-text-18 text-foreground-3">Oh, I have remembered my password!</span>{" "}
            <Button
              color="ghost2"
              size="fit"
              className="text-primary sb-text-18 font-semibold"
              href="/auth/signin"
            >
              Sign in
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button type="submit" color="secondary" onClick={handleGoToEmail}>
            <span>Go to email</span> <ArrowRightCircle className="ml-1" />
          </Button>
          <div className="mt-11">
            <span className="sb-text-18 text-foreground-3">Did not recieve link?</span>{" "}
            <Button
              color="ghost2"
              size="fit"
              className="text-primary sb-text-18 font-semibold"
              onClick={handleResend}
            >
              Resend
            </Button>
          </div>
          <div className="mt-10">
            <span className="sb-text-18 text-foreground-3">Oh, I have remembered my password!</span>{" "}
            <Button
              color="ghost2"
              size="fit"
              className="text-primary sb-text-18 font-semibold"
              href="/auth/signin"
            >
              Sign in
            </Button>
          </div>
        </>
      )}
    </AuthFormWrapper>
  );
};

export default ForgotPassword;

const formInfo: IFormInput[] = [
  {
    name: "email",
    label: "Enter Email Address",
    type: "email",
    textInputProp: {
      placeholder: "Enter your email address",
    },
  },
];

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, { message: "Enter your email address" }),
});

type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;

const defaultValues = {
  email: "",
};
