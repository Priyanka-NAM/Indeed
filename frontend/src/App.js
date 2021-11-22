import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Utils/Theme";
import Landing from "./components/LandingComponent/langingPage";
import Signup from "./components/Signup/Signup";
import EmployerSignup from "./components/Employer/EmployerSignUp";

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={Theme}>
        <div className='App'>
          <Router>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/Signup' component={Signup} />
              <Route path='/postjob' component={EmployerSignup} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
