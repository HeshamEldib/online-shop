import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        {/* <Route path="/" Component={Home} /> */}
      </Routes>
    </>
  );
}

export default App;
