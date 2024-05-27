"use client";

import Image from "next/image";
import { SidebriefLogo } from "@/assets/images";
import { ArrowDown, BellRing, ChevronDown, MenuIcon, Search, Settings } from "lucide-react";
import { Avatar, Button, FooterDivider } from "flowbite-react";
import SearchComp from "../../search";
import Separator from "../../separator";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Header = () => {
  const { push } = useRouter();
  const session = useSession();
  const firstName = session.data?.user?.fullName?.split(" ")?.[0];

  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  return (
    <div className="sticky top-0 bg-background border-b z-20 px-5 md:px-8 ">
      {/* Desktop header */}
      <div className="hidden items-center gap-8 w-full h-20 md:flex">
        <Image src={SidebriefLogo} alt="sidebrief" quality={100} className="object-contain py-4" />
        <Separator vertical />
        <div className="flex items-center justify-between py-4 gap-8 w-full">
          <h2 className="sb-text-24 font-semibold whitespace-nowrap text-foreground-4">
            Hello, <span>{firstName} </span>👋
          </h2>
          <div className="flex items-center gap-4">
            <Button color="ghost" size="fit" className="p-1" onClick={() => push("/notifications")}>
              <BellRing color={iconColor} />
            </Button>
            <Button color="ghost" size="fit" className="p-1">
              <Settings color={iconColor} />
            </Button>
            {/* <Button color="ghost" size="fit" className="flex items-center">
              <Avatar placeholderInitials="OG" rounded />
              <ChevronDown color={iconColor} />
            </Button> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button color="ghost" size="fit" className="flex items-center">
                  <Avatar placeholderInitials="OG" rounded />
                  <ChevronDown color={iconColor} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-28">
                <Button
                  size="fit"
                  color="ghost"
                  className="text-destructive-foreground"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex justify-between py-4 md:hidden">
        <div className="flex items-center gap-4">
          <Button color="ghost" size="fit" className="flex items-center">
            <MenuIcon color={iconColor} />
          </Button>
          <Image src={SidebriefLogo} alt="sidebrief" quality={100} className="object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost" size="fit" className="p-1">
            <Search color={iconColor} />
          </Button>
          <Button color="ghost" size="fit" className="p-1">
            <BellRing color={iconColor} />
          </Button>
          <Button color="ghost" size="fit" className="flex items-center">
            <Avatar placeholderInitials="OG" rounded />
            <ChevronDown color={iconColor} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const iconColor = "hsl(var(--foreground-3))";
