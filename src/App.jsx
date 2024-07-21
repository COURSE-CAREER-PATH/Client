import Courses from "./components/coursesandjobs/Courses";
import Herosection from "./components/Herosection";
import Navbar from "./components/Navbar";
import { Subhero } from "./components/Subhero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nopage from "./components/Nopage";
import Footer from "./components/footer/Footer";
import AdminLogin from "./components/footer/Adminlogin/AdminLogin";
import Forms from "./components/footer/Adminlogin/Forms";
import FormsTwo from "./components/footer/Adminlogin/FormsTwo";


function App() {
  return (
    <>
          <Router>
        <Routes>
          <Route index element={
              <>
                    <Navbar />
                <Herosection />
                <Subhero />
                <Footer/>
              </>
            }
          />
          <Route
            path="/dept"
            element={
              <>
                  <Navbar />
                <Courses />
              </>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Nopage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                  <Forms/>
              </>
            }
          />
          <Route
            path="/formsTwo"
            element={
              <>
                  <FormsTwo/>
              </>
            }
          />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
