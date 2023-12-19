import { Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  Layout,
  DirectProject,
  DisplayClient,
  ResetPassword,
} from "./components";

import {
  RegisterClient,
  RegisterEmployee,
  ManagementMenu,
  ExistingEmployee,
  ExistingClient,
  Login,
  Menu,
} from "./pages";
import PageNotFound from "./pages/PageNotFound";

import PersistLogin from "./components/PersistLogin";

axios.defaults.baseURL = "http://localhost:3500";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route path="menu" element={<Menu />} />
          <Route path="managementMenu" element={<ManagementMenu />} />
          <Route path="registerEmployee" element={<RegisterEmployee />} />
          <Route path="registerClient" element={<RegisterClient />} />
          <Route path="manageEmployee" element={<ExistingEmployee />} />
          <Route path="existingClient" element={<ExistingClient />} />
          <Route path="directProject" element={<DirectProject />} />
          <Route
            path="manageEmployee/resetPassword"
            element={<ResetPassword />}
          />
          <Route path="displayClient/:clientId" element={<DisplayClient />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
