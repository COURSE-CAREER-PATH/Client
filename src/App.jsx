
import Courses from "./components/coursesandjobs/Courses";
import Herosection from "./components/Herosection";
import Navbar from "./components/Navbar";
import { Subhero } from "./components/Subhero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nopage from "./components/Nopage";
import Footer from "./components/footer/Footer";
import Forms from "./components/Forms/Forms";
import FirstPrompt from "./components/Forms/FirstPrompt";
import Maindashboard from "./components/Dashboard/Maindashboard";
import { GlobalStateProvider } from "./components/Forms/ClientsFolder/GlobalStateProvider";
import AccountSettings from "./components/Forms/accountsetting/AccountSettings";
// Import React Toastify CSS
import 'react-toastify/dist/ReactToastify.css';
import EditUserInfo from "./components/Forms/ClientsFolder/edit/EditUserInfo";



function App() {
  return (
    <>
    <GlobalStateProvider>
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
            path="/firstPrompt"
            element={
              <>
                <FirstPrompt/>
              </>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <>
                <Maindashboard/>
              </>
            }
          />
          <Route
            path="/accountsettings/*"
            element={
              <>
                <AccountSettings/>
              </>
            }
          />
          <Route
            path="/edituserinfo/*"
            element={
              <>
                <EditUserInfo/>
              </>
            }
          />
         
        </Routes>
      </Router>
    </GlobalStateProvider>
    </>
  );
}

export default App;
