import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import {
  PublicLayout,
  Login,
  Signup,
  ResetPassword,
  PageNotFound, Home,
} from "@/pages";

const PublicRouter: FunctionComponent = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/authentification/login" element={<Login />} />
        <Route path="authenfication/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
