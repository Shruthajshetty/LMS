import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Myresource from "./components/myresource";
import About from "./components/about";
import Update from "./components/update";
import AddResource from "./components/AddResource";
import Login from "./components/login";
import SignUp from "./components/signup";
function App() {
  return (
    <>
      <center>
        <h2 style={{"font-size": "50px",color: "pink"}}>Learning Management System</h2>
      </center>
      <hr></hr>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Login/>}/>
          <Route path="/sign" element ={<SignUp/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/Addresource" element={<AddResource />} />
          <Route path="/resource" element={<Myresource />} />
          <Route path="/about" element={<About />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
