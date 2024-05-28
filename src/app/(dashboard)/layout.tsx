"use client";

import { Header } from "@/components/header/mainHeader";
import { Navigation } from "@/components/navigation";
import React, { ReactNode } from "react";
import { navRoutes } from "./constants";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />

      <div className="flex-1 relative space-y-6">
        <Navigation navRoutes={navRoutes} className="flex bg-label/[0.02] py-5" />
        <div className="flex-1 px-5 md:px-8 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
