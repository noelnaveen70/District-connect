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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://district-connect-backend.onrender.com/log/session", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>; // ✅ Prevents early redirects
  return user && roles.includes(user.role) ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default Route Redirect */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/job-vacancy" element={<JobVacancy />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/school" element={<School />} />
          
          {/* District-Specific Pages */}
          <Route path="/district/alappuzha" element={<Alappuzha />} />
          <Route path="/district/ernakulam" element={<Ernakulam />} />
          <Route path="/district/idukki" element={<Idukki />} />
          <Route path="/district/kannur" element={<Kannur />} />
          <Route path="/district/kasaragod" element={<Kasaragod />} />
          <Route path="/district/kottayam" element={<Kottayam />} />
          <Route path="/district/kollam" element={<Kollam />} />
          <Route path="/district/kozhikode" element={<Kozhikode />} />
          <Route path="/district/malappuram" element={<Malappuram />} />
          <Route path="/district/palakkad" element={<Palakkad />} />
          <Route path="/district/pathanamthitta" element={<Pathanamthitta />} />
          <Route path="/district/thiruvananthapuram" element={<Thiruvananthapuram />} />
          <Route path="/district/thrissur" element={<Thrissur />} />
          <Route path="/district/wayanad" element={<Wayanad />} />

          {/* Private Routes (Require Authentication) */}
          <Route
            path="/adminpanel"
            element={
              <PrivateRoute roles={["admin"]}>
                <Adminpanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-job"
            element={
              <PrivateRoute roles={["admin"]}>
                <Createjob />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-job"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <Viewjob />
              </PrivateRoute>
            }
          />
          <Route path="/edit-job/:id" element={<Updatejob />} />

          <Route path="/create-tourism" element={<Createtourism />} />
          <Route path="/view-tourism" element={<Viewtourism />} />
          <Route path="/edit-tourism/:id" element={<Updatetourism />} />

          <Route path="/create-hospital" element={<Createhospital />} />
          <Route path="/view-hospital" element={<Viewhospital />} />
          <Route path="/edit-hospital/:id" element={<Updatehospital />} />

          <Route path="/create-school" element={<Createschool />} />
          <Route path="/view-school" element={<Viewschool />} />
          <Route path="/edit-school/:id" element={<Updateschool />} />

          <Route
            path="/jobapply"
            element={
              <PrivateRoute roles={["user"]}>
                <Jobapply />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobapplications"
            element={
              <PrivateRoute roles={["admin"]}>
                <JobApplications />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
