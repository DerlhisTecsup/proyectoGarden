import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "../components/Login/Login";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Signup } from "../components/Signup/Signup";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomRoute() {
  const [userName, setUserName] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
        navigate("/login");
      }
    });
  }, []);
  return (
    <Routes>
      <Route exact path="*" element={<Dashboard name={userName} />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
  );
}

export function MyRoutes() {
  return (
    <Router>
      <CustomRoute />
    </Router>
  );
}
