import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Utils/Theme";
import Landing from './components/Landing/LangingPage';
import Signup from './components/Signup/Signup';
import Company from './components/Company/Company';
import { Login } from './components/Login/Login';
import UserProfile from "./components/Profile/UserProfile";
import Header from "./components/Header/Header";
import JobsDisplay from "./components/Jobs/JobsDisplay";
import EmployerSignup from "./components/Employer/EmployerDetails/EmployerSignUp";
import { CompanyReviews } from "./components/CompanyReviews/CompanyReviews";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Router>
          <Route exact path="/" component={Landing} />
          <Route path="/indeed" component={Header} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/company/:pathname" component={Company} />
          <Route path="/indeed/profile" component={UserProfile} />
          <Route path="/indeed/jobs" component={JobsDisplay} />
          <Route path="/addemployer" component={EmployerSignup} />
          <Route path="/companyreviews" exact component={CompanyReviews} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
