"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import React, { useState } from "react";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loading-icons";
import { IFormInput } from "@/components/form/constants";
import { useResponse } from "@/services";

const SignIn = () => {
  const [isPending, setIsPending] = useState(false);
  const { push } = useRouter();
  const { handleError, handleSuccess } = useResponse();

  const handleSignIn = async ({ values }: { values: formType }) => {
    setIsPending(true);
    const response = await signIn("signIn", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    setIsPending(false);

    if (response?.error) handleError({ error: response?.error });
    else {
      handleSuccess({ data: "Login successful" });
      push("/");
    }
  };

  const handleSignInWithGoogle = async () => {
    await signIn("google", { redirect: true });
  };

  const handleSignInWithYahoo = async () => {
    // const response = await signIn("yahoo");
    // console.log(response);
  };

  return (
    <AuthFormWrapper
      title="Welcome back👋"
      description="Happy to see you, sign in to continue"
      login
      handlers={{
        google: handleSignInWithGoogle,
        yahoo: handleSignInWithYahoo,
      }}
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={signInSchema}
        onFormSubmit={handleSignIn}
        formClassName="gap-4"
      >
        <div className="flex self-end mb-6">
          <Button
            color="link"
            size="fit"
            className="text-foreground hover:underline"
            href="/auth/forgot-password"
          >
            Forgotten password?
          </Button>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center flex-wrap gap-1">
            <p className="sb-text-16 text-foreground-3">Don&#39;t have an account? </p>
            <Button color="ghost2" size="fit" className="text-primary" href="/auth/signup">
              Sign up
            </Button>
          </div>
          <Button
            type="submit"
            color="secondary"
            isProcessing={isPending}
            disabled={isPending}
            processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
          >
            <span>Continue to Sign in</span> {!isPending && <ArrowRightCircle className="ml-1" />}
          </Button>
        </div>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default SignIn;

const formInfo: IFormInput[] = [
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
      placeholder: "Enter your password",
    },
  },
];

const signInSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, { message: "Enter your email address" }),
  password: z.string().min(6, "Password must be 6 or more characters"),
});

type formType = z.infer<typeof signInSchema>;

const defaultValues = {
  email: "",
  password: "",
};
