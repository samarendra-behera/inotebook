import React from 'react'
import { Link, useLocation, useNavigate} from "react-router-dom";
import { useContext } from 'react';
import alertContext from '../context/alert/alertContext';
import Alert from '../components/Alert';
export const Navbar = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const context = useContext(alertContext);
    const { alert } = context;
    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>

                        </ul>
                        <form className="d-flex">
                            {!localStorage.getItem('token') ? <div>
                                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
                            </div> : <button className='btn btn-primary' onClick={handleClick}>Logout</button>}
                        </form>
                    </div>
                </div>
            </nav>

            <Alert alert={alert} />
        </>
    )
}
export default Navbar;
