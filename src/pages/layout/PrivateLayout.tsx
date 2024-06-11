import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/sidebar/Sidebar.tsx";

const PrivateLayout: FunctionComponent = () => {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
