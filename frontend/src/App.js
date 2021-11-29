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

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className='App'>
        <Router>
          <Route exact path='/' component={Landing} />
          <Route path='/indeed' component={Header} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route exact path='/company/:id/:pathname' component={Company} />
          <Route path='/indeed/profile' component={UserProfile} />
          <Route path='/indeed/saved-jobs' component={SavedJobs} />
          <Route path='/indeed/jobs' component={JobsDisplay} />
          <Route path='/addemployer' component={EmployerSignup} />
          <Route
            path='/indeed/companyreviews'
            exact
            component={CompanyReviews}
          />
          <Route path='/employer' component={EmployerHeader} />
          <Route path='/employer/postJob' component={EmployerJobPost} />

          <Route
            path='/employer/jobs-posted'
            component={EmployerJobPostingHome}
          />
          <Route path='/reports' component={EmployerHomePage} />
          <Route path='/admindashboard' component={Admindashboard} />
          <Route exact path='/employer/' component={EmployerLandingPage} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
