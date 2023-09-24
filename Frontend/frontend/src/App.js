import { Routes, Route } from "react-router-dom";
import {
  Layout,
  Public,
  Login,
  Menu,
  RegisterClient,
  ExistingClient,
  DirectProject,
} from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="menu" element={<Menu />} />
        <Route path="registerClient" element={<RegisterClient />} />
        <Route path="existingClient" element={<ExistingClient />} />
        <Route path="directProject" element={<DirectProject />} />
      </Route>
    </Routes>
  );
}

export default App;
