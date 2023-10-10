import { Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  Layout,
  Login,
  Menu,
  RegisterClient,
  DirectProject,
  ExistingClient,
} from "./components";

axios.defaults.baseURL = 'http://localhost:3500';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="menu" element={<Menu />} />
        <Route path="registerClient" element={<RegisterClient />} />
        <Route path="existingClient" element={<ExistingClient />} />
        <Route path="directProject" element={<DirectProject />} />
      </Route>
    </Routes>
  );
}

export default App;
