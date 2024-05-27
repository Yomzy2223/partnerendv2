import { Button } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import RequirementForm from "../form/requirementForm";
import { useGetCountryReqForm } from "@/services/requirementQA";
import { useSession } from "next-auth/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatusAlert({
  hasSubmittedQA,
  setOpenAlert,
  partnerStatus,
}: {
  hasSubmittedQA: boolean;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
  partnerStatus: "INACTIVE" | "SUBMITTED" | "ACTIVATED" | "DEACTIVATED" | "DECLINED";
}) {
  const [open, setOpen] = useState(false);

  const session = useSession();
  const country = session.data?.user?.country?.toLowerCase();

  const countryReqFormRes = useGetCountryReqForm({ country });
  const countryReqForms = countryReqFormRes.data?.data?.data;

  let message = "To receive tasks, you need to activate your account.";
  if (partnerStatus === "DEACTIVATED")
    message =
      "Your account has been deactivated. You will no longer receive any task from Sidebrief. Kindly reach out to hello@sidebrief.com for rectification";
  if (partnerStatus === "DECLINED")
    message =
      "Your account has been declined. You will no longer receive any task from Sidebrief. Kindly reach out to hello@sidebrief.com for rectification";
  if (partnerStatus === "SUBMITTED")
    message = "Our team is currently going through your application. We will notify you soon.";

  let btnText;
  if (partnerStatus === "SUBMITTED") btnText = "Edit form";
  if (partnerStatus === "INACTIVE") btnText = "Click here to verify";

  return (
    <div className="mr-4 absolute right-0 top-0">
      <div className="border rounded-md border-none bg-destructive m-2 p-3.5">
        <div className="flex items-center justify-between gap-6">
          <span
            className={cn(
              "inline-flex items-center space-x-2 font-semibold text-destructive-foreground",
              {
                "text-secondary": partnerStatus === "SUBMITTED",
              }
            )}
          >
            <div
              className={cn("p-1 rounded-full bg-destructive-foreground", {
                "bg-secondary": partnerStatus === "SUBMITTED",
              })}
            >
              <Check size={10} strokeWidth={6} color="#fff" />
            </div>
            <h2>Activation</h2>
          </span>
          <Button size="fit" color="ghost" className="w-max" onClick={() => setOpenAlert(false)}>
            <X size={14} color="hsl(var(--destructive-foreground))" />
          </Button>
        </div>

        <div>
          <span
            className={cn("text-sm text-destructive-foreground", {
              "text-sm text-magenta": partnerStatus === "SUBMITTED",
            })}
          >
            {message}{" "}
          </span>
          {btnText && (
            <Button size="fit" color="ghost" className="w-max" onClick={() => setOpen(true)}>
              <span className="text-sm mr-2 text-primary">{btnText}</span>
            </Button>
          )}
        </div>
      </div>
      <RequirementForm open={open} setOpen={setOpen} forms={countryReqForms || []} />
    </div>
  );
}
