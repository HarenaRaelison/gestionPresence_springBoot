
// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersistentDrawerRight from "./components/sideBar";
import Cours from "./components/Cours";
import Salle from "./components/Salle";
import Students from "./components/Students";
import Attendance from "./components/Attendance";
import Rapport from "./components/Rapport";

export default function App() {
  return (
    <Router>
      <PersistentDrawerRight>
        <Routes>
          <Route path="/cours" element={<Cours />} />
          <Route path="/salle" element={<Salle />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/rapport" element={<Rapport />} />
        </Routes>
      </PersistentDrawerRight>
    </Router>
  );
}

