import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import {PrivateLayout, Home, Profile, PageNotFound, Notifications, Calender} from "@/pages";

const PrivateRouter: FunctionComponent = () => {
  return (
    <Routes>
        <Route element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/notifications/:id" element={<Notifications/>} />
          <Route path="/calender/:id" element={<Calender/>} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
    </Routes>
  );
};

export default PrivateRouter;
