import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AlertState from './context/alert/alertState'

function App() {
  
  return (
    <>
      <NoteState>
        <AlertState>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </NoteState>
    </>
  );
}

export default App;
