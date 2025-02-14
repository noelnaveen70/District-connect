import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Login from "./components/Login";
import Districts from "./components/Districts";
import Adminpanel from "./components/Adminpanel";
import Createjob from "./components/Createjob";
import Viewjob from "./components/Viewjob";
import Createtourism from "./components/Createtourism";
import Viewtourism from "./components/Viewtourism";
import Updatejob from "./components/Updatejob";
import Updatetourism from "./components/Updatetourism";
import Createhospital from "./components/Createhospital";
import Viewhospital from "./components/Viewhospital";
import Updatehospital from "./components/Updatehospital";
import Updateschool from "./components/Updateschool";
import Createschool from "./components/Createschool";
import Viewschool from "./components/Viewschool";
import Alappuzha from "./components/AllDistricts/Alappuzha";
import Ernakulam from "./components/AllDistricts/Ernakulam";
import Idukki from "./components/AllDistricts/Idukki";
import Kannur from "./components/AllDistricts/Kannur";
import Kasaragod from "./components/AllDistricts/Kasaragod";
import Kottayam from "./components/AllDistricts/Kottayam";
import Kollam from "./components/AllDistricts/Kollam";
import Kozhikode from "./components/AllDistricts/Kozhikode";
import Malappuram from "./components/AllDistricts/Malappuram";
import Palakkad from "./components/AllDistricts/Palakkad";
import Pathanamthitta from "./components/AllDistricts/Pathanamthitta";
import Thiruvananthapuram from "./components/AllDistricts/Thiruvananthapuram";
import Thrissur from "./components/AllDistricts/Thrissur";
import Wayanad from "./components/AllDistricts/Wayanad";

import JobVacancy from "./components/JobVacancy";
import Tourism from "./components/Tourism";
import Hospital from "./components/Hospital";
import School from "./components/School";
import Jobapply from "./components/Jobapply";
import JobApplications from "./components/JobApplications";
import { AuthProvider } from "./components/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://district-connect-backend.onrender.com/log/session", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  if (user === null) return <Navigate to="/login" />;
  return roles.includes(user.role) ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/Adminpanel" element={<Adminpanel />} />
          <Route path="/Createjob" element={<Createjob />} />
          <Route path="/Viewjob" element={<Viewjob />} />
          <Route path="/Createtourism" element={<Createtourism />} />
          <Route path="/Viewtourism" element={<Viewtourism />} />
          <Route path="/edit-job/:id" element={<Updatejob />} />
          <Route path="/edit-tourism/:id" element={<Updatetourism />} />
          <Route path="/Createhospital" element={<Createhospital />} />
          <Route path="/Viewhospital" element={<Viewhospital />} />
          <Route path="/edit-hospital/:id" element={<Updatehospital />} />
          <Route path="/edit-school/:id" element={<Updateschool />} />
          <Route path="/Createschool" element={<Createschool />} />
          <Route path="/Viewschool" element={<Viewschool />} />
          <Route path="/district/alappuzha" element={<Alappuzha />} />
          <Route path="/district/Ernakulam" element={<Ernakulam />} />
          <Route path="/district/Idukki" element={<Idukki />} />
          <Route path="/district/Kannur" element={<Kannur />} />
          <Route path="/district/Kasaragod" element={<Kasaragod />} />
          <Route path="/district/Kottayam" element={<Kottayam />} />
          <Route path="/district/Kollam" element={<Kollam />} />
          <Route path="/district/Kozhikode" element={<Kozhikode />} />
          <Route path="/district/Malappuram" element={<Malappuram />} />
          <Route path="/district/Palakkad" element={<Palakkad />} />
          <Route path="/district/Pathanamthitta" element={<Pathanamthitta />} />
          <Route path="/district/Thiruvananthapuram" element={<Thiruvananthapuram />} />
          <Route path="/district/Thrissur" element={<Thrissur />} />
          <Route path="/district/Wayanad" element={<Wayanad />} />


          <Route path="/district/Hospital" element={<Hospital />} />
          <Route path="/district/School" element={<School />} />
          <Route path="/job-vacancy" element={<JobVacancy />} />
          <Route path="/Tourism" element={<Tourism />} />
          <Route path="/Hospital" element={<Hospital />} />
          <Route path="/School" element={<School />} />
          <Route path="/Jobapply" element={<Jobapply />} />
          <Route path="/JobApplications" element={<JobApplications />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
