
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/landing/Dashboard";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
    {/* <Navbar/> */}
       <Routes>    
       <Route path="/" element={<Dashboard />} />    
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
