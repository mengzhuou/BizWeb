import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="public" element={<Public />} />
        <Route path="login" element={<Login />} />

      </Route>
    </Routes>
  );
}

export default App;