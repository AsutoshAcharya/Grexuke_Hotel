// import { HomePage } from './Pages/home/HomePage';
import HomePage from "./Pages/home/HomePage";
import List from "./Pages/List/List";
import Hotels from "./Pages/Hotels/Hotels";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/hotels" element={<List />} />
        <Route exact path="/hotels/:id" element={<Hotels />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
