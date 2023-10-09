import { Routes, Route } from "react-router-dom";
import useCookie from "./customHooks/useCookie"
import {
  Layout,
  Login,
  Menu,
  RegisterClient,
  DirectProject,
  ExistingClient,
} from "./components";

function App() {
  const [value, update ] = useCookie("user", null)

  return (
    <Routes>
      {console.log('Cookie value ', value)}
      {console.log(value === 'null')}
      {value !== 'null' ? 
      <Route path="/" element={<Layout update={update} />}>
        <Route index element={<Menu />} />
        <Route path="registerClient" element={<RegisterClient />} />
        <Route path="existingClient" element={<ExistingClient />} />
        <Route path="directProject" element={<DirectProject />} />
      </Route> : 
      <Route path="/" element={<Layout update={update} />}>
        <Route index element={<Login update={update}/>} />
      </Route>}
    </Routes>
  );
}

export default App;
