import { Header } from "@/components/header/mainHeader";
import { Navigation } from "@/components/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />

      <Navigation navRoutes={navRoutes} className="flex bg-label/[0.02] py-5" />
      <div className="flex-1 px-5 md:px-8">{children}</div>
    </div>
  );
};

export default Layout;

// Dashboard navigation routes
const navRoutes = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Tasks",
    to: "/tasks",
  },
  {
    name: "Payments",
    to: "/payments",
  },
  {
    name: "Settings",
    to: "/settings",
  },
];
