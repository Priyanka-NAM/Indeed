import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Utils/Theme";
import Landing from './components/Landing/LangingPage';
import Signup from './components/Signup/Signup';
import { Login } from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
      <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router> 
      </div>
    </ThemeProvider>
          
    </div>
  );
}

export default App;
