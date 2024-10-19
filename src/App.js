import React from "react";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResumeForm from "./components/ResumeForm/ResumeForm";
import Header from "./components/common/Header";
import LinkedInResume from "./components/LinkedInResume/LinkedInResume";
import ProgrammersResume from "./components/ProgrammersResume/ProgrammersResume";
import WantedResume from "./components/WantedResume/WantedResume";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Footer from "./components/common/Footer";
import ServiceIntro from "./components/ServiceIntro/ServiceIntro";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/service-intro" element={<ServiceIntro />} />
              <Route path="/resume" element={<ResumeForm />} />
              <Route path="/linkedin" element={<LinkedInResume />} />
              <Route path="/programmers" element={<ProgrammersResume />} />
              <Route path="/wanted" element={<WantedResume />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
