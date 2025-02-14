import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/districts" element={<Districts />} />
        <Route path="/adminpanel" element={<PrivateRoute roles={['admin']}><Adminpanel /></PrivateRoute>} />
        <Route path="/create-job" element={<Createjob />} />
        <Route path="/view-job" element={<Viewjob />} />
        <Route path="/create-tourism" element={<Createtourism />} />
        <Route path="/view-tourism" element={<Viewtourism />} />
        <Route path="/edit-job/:id" element={<Updatejob />} />
        <Route path="/edit-tourism/:id" element={<Updatetourism />} />
        <Route path="/create-hospital" element={<Createhospital />} />
        <Route path="/view-hospital" element={<Viewhospital />} />
        <Route path="/edit-hospital/:id" element={<Updatehospital />} />
        <Route path="/edit-school/:id" element={<Updateschool />} />
        <Route path="/create-school" element={<Createschool />} />
        <Route path="/view-school" element={<Viewschool />} />
        <Route path="/job-vacancy" element={<JobVacancy />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/school" element={<School />} />
        <Route path="/jobapply" element={<Jobapply />} />
        <Route path="/job-applications" element={<JobApplications />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
