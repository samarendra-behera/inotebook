import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYzhiYjM2Yzc2ZGViOGRjYzQ1YjIwIn0sImlhdCI6MTYzODcxOTcyOH0.FlCI2VblBvMQwPQ67PC0PqGowussTkoTOWV8_4snyp8"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        setCredentials({ email: "", password: "" })
        if(json.success){
            // Save the auth token and Redirect
            localStorage.setItem('token',json.authtoken);
            navigate('/');

        }
        else{
            alert('Invalid Credentials');
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" id="password" name="password" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
