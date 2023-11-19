import { Routes, Route} from "react-router-dom";
import axios from "axios";
import {
  Layout,
  Menu,
  Login,
  ManagementMenu,
  RegisterClient,
  RegisterEmployee,
  DirectProject,
  DisplayClient,
  ExistingClient,
  ResetPassword,
} from "./components";
import PageNotFound from "./components/PageNotFound";

import PersistLogin from "./components/PersistLogin";
import ExistingEmployee from "./components/ExistingEmployee";

axios.defaults.baseURL = 'http://localhost:3500';

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
          <Route path="manageEmployee/resetPassword" element={<ResetPassword />} />
          <Route path="displayClient/:clientId" element={<DisplayClient />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
