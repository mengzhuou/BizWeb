import { Routes, Route } from "react-router-dom";
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
} from "./components";

import PersistLogin from "./components/PersistLogin";


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
          <Route path="existingClient" element={<ExistingClient />} />
          <Route path="directProject" element={<DirectProject />} />
          <Route path="displayClient/:clientId" element={<DisplayClient />} />
          </Route>
      </Route>
    </Routes>
  );
}

export default App;
