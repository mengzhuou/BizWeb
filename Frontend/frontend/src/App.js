import { Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  Layout,
  Login,
  Menu,
  ManagementMenu,
  RegisterClient,
  RegisterEmployee,
  DirectProject,
  DisplayClient,
  ExistingClient,
} from "./components";

axios.defaults.baseURL = 'http://localhost:3500';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="menu" element={<Menu />} />
        <Route path="managementMenu" element={<ManagementMenu />} />
        <Route path="registerEmployee" element={<RegisterEmployee />} />
        <Route path="registerClient" element={<RegisterClient />} />
        <Route path="existingClient" element={<ExistingClient />} />
        <Route path="directProject" element={<DirectProject />} />
        <Route path="displayClient/:clientId" element={<DisplayClient />} />
      </Route>
    </Routes>
  );
}

export default App;
