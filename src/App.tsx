import { FunctionComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthGuard, PublicGuard} from "@/guards/AuthGuard";
import PrivateRouter from "@/routers/PrivateRouter";
import PublicRouter from "@/routers/PublicRouter";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthGuard>
              <PrivateRouter />
            </AuthGuard>
          }
        />
        <Route
          path="/authentication/*"
          element={
            <PublicGuard>
              <PublicRouter />
            </PublicGuard>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;