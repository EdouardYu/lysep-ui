import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import {
  PrivateLayout,
  Profile,
  PageNotFound,
  Notifications,
  Calender,
  Alerts,
  Modules,
} from "@/pages";

const PrivateRouter: FunctionComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route index element={<Calender />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default PrivateRouter;
