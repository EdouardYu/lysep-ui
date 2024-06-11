import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import {PrivateLayout, Home, Profile, PageNotFound, Notifications, Calender, Alerts} from "@/pages";

const PrivateRouter: FunctionComponent = () => {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route element={<PrivateLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/alerts" element={<Alerts/>} />
          <Route path="/calender" element={<Calender/>} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
    </Routes>
  );
};

export default PrivateRouter;
