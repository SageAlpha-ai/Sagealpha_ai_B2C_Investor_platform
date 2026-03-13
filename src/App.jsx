import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/dashboard/InvestorDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import MyReports from "./pages/MyReports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<InvestorDashboard />} />
        <Route path="/my-reports" element={<MyReports />} />
      </Routes>
    </Router>
  );
}

export default App;
