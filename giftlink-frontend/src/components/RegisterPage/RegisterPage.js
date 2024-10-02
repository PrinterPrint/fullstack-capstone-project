import React, { useState } from 'react';
// Import urlConfig from the config file
import { urlConfig } from '../../config';
// Import useAppContext to manage the global login status
import { useAppContext } from '../../context/AuthContext';
// Import useNavigate to handle page navigation
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for handling error messages
    const [showerr, setShowerr] = useState('');

    // Get `setIsLoggedIn` from the AppContext and initialize `navigate`
    const { setIsLoggedIn } = useAppContext();
    const navigate = useNavigate();

    // insert code here to create handleRegister function and include console.log
    // handleRegister function to be called on form submit
    // handleRegister function that will send the user registration details to the backend
    const handleRegister = async () => {
        try {
            // Send a POST request to the backend API for user registration
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                }),
            });

            // Task 1: Access data coming from fetch API
            const json = await response.json();

            if (response.ok) {
                const data = await response.json();
                // Assume the token is returned upon successful registration
                // localStorage.setItem('token', data.authtoken);

                // Task 2: Set user details in session storage
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', email);

                // Task 3: Set the state of user to logged in using the useAppContext
                setIsLoggedIn(true);  // Update the login status globally
                // Task 4: Navigate to the MainPage after logging in
                navigate('/app');     // Redirect to the app page
            } else {
                // const errorData = await response.json();
                //setShowerr(errorData.error || 'Registration failed.');
                // Task 5: Set an error message if the registration fails
                setShowerr(json.error || 'Registration failed.');
            }
        } catch (error) {
            console.log("Error fetching details: " + error.message);
            setShowerr('An unexpected error occurred.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* Task 6: Display error message to end user */}
                        {showerr && <div className="text-danger">{showerr}</div>}

                        {/* Display error message */}
                        {/* showerr && <p style={{ color: 'red' }}>{showerr}</p> */}

                        {/* Input for First Name */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input for Last Name */}
                        <div className="mb-4">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input for Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input for Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Register Button */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
                            Register
                        </button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
