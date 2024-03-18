import React, { useState } from 'react';
import './style.css'; // Adjust the path as needed


const Login = ({ onLogin }) => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    // Login state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Registration state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLoginForm) {
            // Login logic
            onLogin(username, password);
        } else {
            // Registration logic
            console.log("Registration Submitted");
            // Implement registration logic here
        }
    };

    const toggleForm = () => setIsLoginForm(!isLoginForm);

    return isLoginForm ? (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login to Your Account</h2>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                <center><p>or</p></center>
                <button type="button" onClick={toggleForm}>Register</button>
            </form>
        </div>
    ) : (
        <div className="registration-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <h2>Register a New Account</h2>
                <div className="form-control">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="registerPassword">Password</label>
                    <input type="password" id="registerPassword" name="registerPassword" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="age">Age/Birthday</label>
                    <input type="text" id="age" name="age" required value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" required value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button type="submit">Register</button>
                or
                <button type="button" onClick={toggleForm}>Back to Login</button>
            </form>
        </div>
    );
};

export default Login;
