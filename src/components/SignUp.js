import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
export const SignUp = () => {
    const context = useContext(alertContext);
    const { showAlert } = context;
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (cpassword === password) {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json);
            setCredentials({ name: "", email: "", password: "", cpassword: "" })
            if (json.success) {
                // Save the auth token and Redirect
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                showAlert('Account Created Successfully', 'success');

            }
            else {
                showAlert('Invalid credentials', 'danger');
            }
        }
        else {
            showAlert("Password confirmation doesn't match Password",'danger');
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='my-3 container'>
            <h2 className="my-3">Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" value={credentials.name} className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name='name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" name="password" id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" value={credentials.cpassword} className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;