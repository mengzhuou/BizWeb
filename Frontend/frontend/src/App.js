import { Routes, Route } from "react-router-dom";
import useCookie from "./customHooks/useCookies";

import {
  Layout,
  Login,
  Menu,
  RegisterClient,
  DirectProject,
  ExistingClient,
} from "./components";

function App() {

  const [value, updateCookie, deleteCookie] = useCookie('user', null)

  return (
    <Routes>
      {value !== 'null' ? 
      <Route path="/" element={<Layout updateCookie={updateCookie} />}>
        <Route index element={<Menu />} />
        <Route path="registerClient" element={<RegisterClient />} />
        <Route path="existingClient" element={<ExistingClient />} />
        <Route path="directProject" element={<DirectProject />} />
      </Route> : 
      <Route path="/" element={<Layout updateCookie={updateCookie} />}>
        <Route index element={<Login updateCookie={updateCookie}/>} />
      </Route>}
    </Routes>
  );
}

export default App;
