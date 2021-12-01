import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Utils/Theme";
import Landing from "./components/Landing/LangingPage";
import Signup from "./components/Signup/Signup";
import Company from "./components/Company/Company";
import { Login } from "./components/Login/Login";
import UserProfile from "./components/Profile/UserProfile";
import Header from "./components/Header/Header";
import JobsDisplay from "./components/Jobs/JobsDisplay";
import EmployerSignup from "./components/Employer/EmployerDetails/EmployerSignUp";
import { CompanyReviews } from "./components/CompanyReviews/CompanyReviews";
import EmployerJobPost from "./components/Employer/EmployerJobPosting/EmployerJobPost";
import EmployerHomePage from "./components/Employer/EmployerHomePage/EmployerHomePage";
import EmployerJobPostingHome from "./components/Employer/EmployerJobPosting/EmployerJobPostingHome";
import Admindashboard from "./components/Admin/Dashboard";
import StickyHeadTable from "./components/Employer/EmployerJobPosting/delete";
import EmployerHeader from "./components/Employer/EmployerHomePage/EmployerHeader";
import EmployerLandingPage from "./components/Employer/EmployerHomePage/EmployerLandingPage";
import SavedJobs from "./components/Profile/SavedJobs";
import EmployerProfile from "./components/Employer/EmployerProfile/EmployerProfile";
import EmployerCompanyDetailsUpdate from "./components/Employer/EmployerDetails/EmployerCompanyDetailsUpdate";
import AdminListCompanies from "./components/AdminCompany/AdminCompany";
import EachJobDetails from "./components/Employer/EmployerJobPosting/EachJobDetailsPage";
import EmployerReviews from "./components/Employer/EmployerReviews/EmployerReviews";
import EmployerJobApplicants from "./components/Employer/EmployerApplicants/EmployerJobApplicants";
import JobSeekerMessage from "./components/Messages/JobSeekerMessage";

import EmployerPieChart from "./components/Employer/EmployerReports/EmployerPieChart";
import { FindSalaries } from "./components/FindSalaries/FindSalaries";
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Router>
          <Route exact path="/" component={Landing} />
          <Route path="/indeed" component={Header} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/company/:id/:pathname" component={Company} />
          <Route path="/indeed/profile" component={UserProfile} />
          <Route path="/indeed/messages" component={JobSeekerMessage} />
          <Route path="/indeed/saved-jobs" component={SavedJobs} />
          <Route path="/indeed/jobs" component={JobsDisplay} />
          <Route path="/indeed/find-salaries" component={FindSalaries} />
          <Route path="/addemployer" component={EmployerSignup} />
          <Route
            path="/indeed/companyreviews"
            exact
            component={CompanyReviews}
          />
          <Route path="/employer" component={EmployerHeader} />
          <Route path="/employer/postJob" component={EmployerJobPost} />

          <Route
            path="/employer/jobs-posted"
            component={EmployerJobPostingHome}
          />
          {/* <Route path='/reports' component={EmployerHomePage} /> */}
          {/* <Route path='/employer/home' component={EmployerHomePage} /> */}
          <Route
            exact
            path="/employer/home/:id/:pathname"
            component={EmployerHomePage}
          />
          <Route path="/admindashboard" component={Admindashboard} />
          <Route exact path="/employer/" component={EmployerLandingPage} />
          <Route path="/employer/profile" component={EmployerProfile} />
          <Route
            exact
            path="/employer/company/update"
            component={EmployerCompanyDetailsUpdate}
          />
          <Route path="/employer/showJobDetails" component={EachJobDetails} />
          <Route path="/employer/reviews" component={EmployerReviews} />
          <Route path="/employer/reports" component={EmployerPieChart} />

          <Route path="/indeed/allcompanies" component={AdminListCompanies} />
          <Route
            path="/employer/applicant-page/:id"
            exact
            component={EmployerJobApplicants}
          />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
