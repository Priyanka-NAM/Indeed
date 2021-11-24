import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Utils/Theme";
import Landing from './components/Landing/LangingPage';
import Signup from './components/Signup/Signup';
import { Login } from './components/Login/Login';
import UserProfile from './components/Profile/UserProfile';
import Header from './components/Header/Header';
import JobsDisplay from './components/Jobs/JobsDisplay';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
      <div className="App">
      <Router>
          <Route exact path="/" component={Landing} />
          <Route path="/indeed" component={Header} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/indeed/profile" component={UserProfile} />
          <Route path="/indeed/jobs" component={JobsDisplay} />
      </Router> 
      </div>
    </ThemeProvider>
          
    </div>
  );
}

export default App;
