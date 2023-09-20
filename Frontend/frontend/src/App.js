import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login';
import Menu from './components/Menu';
import RegisterClient from './components/RegisterClient';
import ExistingClient from './components/ExistingClient';
import DirectProject from './components/DirectProject';

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