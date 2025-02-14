import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://district-connect-backend.onrender.com/log/session", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          setUser(response.data.user);
        } else {
          setUser(null);
          navigate("/login");
        }
      })
      .catch(() => {
        setUser(null);
        navigate("/login");
      });
  }, [navigate]);

  return user && roles.includes(user.role) ? children : <Navigate to="/home" />;
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
        <Route path="/createjob" element={<PrivateRoute roles={['admin']}><Createjob /></PrivateRoute>} />
        <Route path="/viewjob" element={<Viewjob />} />
        <Route path="/createtourism" element={<PrivateRoute roles={['admin']}><Createtourism /></PrivateRoute>} />
        <Route path="/viewtourism" element={<Viewtourism />} />
        <Route path="/edit-job/:id" element={<PrivateRoute roles={['admin']}><Updatejob /></PrivateRoute>} />
        <Route path="/edit-tourism/:id" element={<PrivateRoute roles={['admin']}><Updatetourism /></PrivateRoute>} />
        <Route path="/createhospital" element={<PrivateRoute roles={['admin']}><Createhospital /></PrivateRoute>} />
        <Route path="/viewhospital" element={<Viewhospital />} />
        <Route path="/edit-hospital/:id" element={<PrivateRoute roles={['admin']}><Updatehospital /></PrivateRoute>} />
        <Route path="/edit-school/:id" element={<PrivateRoute roles={['admin']}><Updateschool /></PrivateRoute>} />
        <Route path="/createschool" element={<PrivateRoute roles={['admin']}><Createschool /></PrivateRoute>} />
        <Route path="/viewschool" element={<Viewschool />} />
        <Route path="/job-vacancy" element={<JobVacancy />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/school" element={<School />} />
        <Route path="/jobapply" element={<Jobapply />} />
        <Route path="/jobapplications" element={<PrivateRoute roles={['admin']}><JobApplications /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
