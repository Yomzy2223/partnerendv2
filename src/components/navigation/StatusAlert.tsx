import { Button } from "flowbite-react";
import { useState } from "react";
import RequirementForm from "../form/requirementForm";
import { useGetCountryReqForm } from "@/services/requirementQA";
import { useSession } from "next-auth/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatusAlert({ hasSubmittedQA }: { hasSubmittedQA: boolean }) {
  const [open, setOpen] = useState(false);

  const session = useSession();
  const country = session.data?.user?.country?.toLowerCase();

  const countryReqFormRes = useGetCountryReqForm({ country });
  const countryReqForms = countryReqFormRes.data?.data?.data;

  return (
    <div className="mr-4 absolute right-0 top-0">
      <div className="border rounded-md border-none bg-destructive m-2 p-3.5">
        <span
          className={cn("inline-flex items-center space-x-2 font-semibold text-magenta", {
            " text-destructive-foreground": hasSubmittedQA,
          })}
        >
          <div
            className={cn("p-1 rounded-full bg-secondary", {
              "bg-destructive-foreground": hasSubmittedQA,
            })}
          >
            <Check size={10} strokeWidth={6} color="#fff" />
          </div>
          <h2>Activation</h2>
        </span>

        {hasSubmittedQA ? (
          <div>
            <span className="text-sm text-destructive-foreground">
              Our team is currently going through your application. We will notify you soon.{" "}
            </span>
            <Button size="fit" color="ghost" className="w-max" onClick={() => setOpen(true)}>
              <span className="text-sm mr-2 text-primary">Edit form</span>
            </Button>
          </div>
        ) : (
          <div className="font-medium">
            <span className="text-sm text-magenta">
              To receive tasks, you need to activate your account.{" "}
            </span>
            <Button size="fit" color="ghost" className="w-max" onClick={() => setOpen(true)}>
              <span className="text-sm mr-2 text-primary">Click here to verify</span>{" "}
            </Button>
          </div>
        )}
      </div>
      <RequirementForm open={open} setOpen={setOpen} forms={countryReqForms || []} />
    </div>
  );
}
