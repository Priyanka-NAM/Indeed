import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/LandingComponent/langingPage';
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Utils/Theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
      <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router> 
      </div>
    </ThemeProvider>
          
    </div>
  );
}

export default App;
