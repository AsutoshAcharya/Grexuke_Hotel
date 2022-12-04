// import { HomePage } from './Pages/home/HomePage';
import HomePage from "./Pages/home/HomePage";
import List from "./Pages/List/List";
import Hotels from "./Pages/Hotels/Hotels";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import CancellationPolicy from "./Pages/CancellationPolicy/CancellationPolicy";
function App() {

  const {user}=useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/hotels" element={<List />} />
        <Route exact path="/hotels/:id" element={<Hotels />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/cancel" element={<CancellationPolicy />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
