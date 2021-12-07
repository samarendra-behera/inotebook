import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
