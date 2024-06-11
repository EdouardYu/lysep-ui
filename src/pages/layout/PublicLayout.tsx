import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: FunctionComponent = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
