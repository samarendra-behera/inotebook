import './App.css';
import {BrowserRouter as Router,Routes as Switch,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
        </Switch>

      </Router>
    </>
  );
}

export default App;
