import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavBar from "./components/app/Navbar/Navbar";
import SideBar from "./components/app/Sidebar/Sidebar";
import EmployerPage from "./pages/Employer/EmployersPage/EmployerPage";
import EmployerDetailsPage from "./pages/Employer/EmployerDetailsPage/EmployerDetailsPage";
import EmployerAdvertisesPage from "./pages/Employer/EmployerAdvertisesPage/EmployerAdvertisesPage";
import EmployerRequestsPage from "./pages/Employer/EmployerRequestsPage/EmployerRequestsPage";
import JobSeekersPage from "./pages/JobSeeker/JobSeekersPage/JobSeekersPage";
import JobSeekersDetailsPage from "./pages/JobSeeker/JobSeekerDetailsPage/JobSeekerDetailsPage";
import JobSeekerAdvertisesPage from "./pages/JobSeeker/JobSeekerAdvertisesPage/JobSeekerAdvertisesPage";
import JobSeekerRequestsPage from "./pages/JobSeeker/JobSeekerRequestsPage/JobSeekerRequestsPage";
import EmployerPanel from "./pages/Employer/EmployerPanel";
import JobSeekerPanel from "./pages/JobSeeker/JobSeekerPanel";
import GenderChartPage from "./pages/Charts/GenderChartPage";
import AdSalaryChartPage from "./pages/Charts/AdSalaryChartPage";
import PositionChartPage from "./pages/Charts/PositionChartPage";
import UsersChartPage from "./pages/Charts/UsersChartPage";
import ChartsPanel from "./pages/Charts/ChartsPanel";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && JSON.stringify(theme) === "dark") {
      const html = document.querySelector("html");
      html?.classList.add("dark");
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employer-panel" element={<EmployerPanel />} />
          <Route path="/employers" element={<EmployerPage />} />
          <Route path="/employer-details" element={<EmployerDetailsPage />} />
          <Route
            path="/employer-advertises"
            element={<EmployerAdvertisesPage />}
          />
          <Route path="/employer-requests" element={<EmployerRequestsPage />} />
          <Route path="/jobseeker-panel" element={<JobSeekerPanel />} />
          <Route path="/jobseekers" element={<JobSeekersPage />} />
          <Route
            path="/jobseeker-details"
            element={<JobSeekersDetailsPage />}
          />
          <Route
            path="/jobseeker-advertises"
            element={<JobSeekerAdvertisesPage />}
          />
          <Route
            path="/jobseeker-requests"
            element={<JobSeekerRequestsPage />}
          />
          <Route path="/charts" element={<ChartsPanel />} />
          <Route path="/charts/ad-salary" element={<AdSalaryChartPage />} />
          <Route path="/charts/position" element={<PositionChartPage />} />
          <Route path="/charts/users" element={<UsersChartPage />} />
          <Route path="/charts/gender" element={<GenderChartPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
