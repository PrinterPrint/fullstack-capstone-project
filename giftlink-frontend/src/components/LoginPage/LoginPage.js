import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    // insert code here to create useState hook variables for email, password, and incorrect login message
    // Create useState hook variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');

    // Task 5: Create local variables for `navigate`, `bearerToken`, and `setIsLoggedIn`
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    // Task 6: If the bearerToken has a value (user already logged in), navigate to MainPage
    useEffect(() => {
        if (bearerToken) {
            navigate('/app'); // Redirect to MainPage if user is already logged in
        }
    }, [bearerToken, navigate]);

    // insert code here to create handleLogin function and include console.log
    // Define the handleLogin function that logs a message
      const handleLogin = async () => {
          console.log("Inside handleLogin");
          console.log(`Email: ${email}`);
          //console.log(`Password: ${password}`); // Avoid logging sensitive data in production

          try {
              const response = await fetch(`${urlConfig.apiUrl}/auth/login`, {
                  method: 'POST', // Task 7: Set the POST method

                  // Task 8: Set headers
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
                  },

                  // Task 9: Set body to send user details
                  body: JSON.stringify({
                      email: email,
                      password: password,
                  }),
              });

              // Task 1: Access the JSON response from the API
              const json = await response.json();

              // Task 5: Check if login is successful (authtoken present)
              if (json.authtoken) {
                  // Task 2: Set user details in sessionStorage
                  sessionStorage.setItem('auth-token', json.authtoken);
                  sessionStorage.setItem('name', json.userName);
                  sessionStorage.setItem('email', json.userEmail);

                  // Task 3: Set user state as logged in
                  setIsLoggedIn(true);

                  // Task 4: Navigate to MainPage after successful login
                  navigate('/app');
              } else {
                  // If the login failed (e.g., wrong password), show an error
                  document.getElementById("email").value = "";
                  document.getElementById("password").value = "";
                  setIncorrect("Wrong password. Try again.");

                  // Clear the error message after 2 seconds
                  setTimeout(() => {
                      setIncorrect("");
                  }, 2000);
              }
          } catch (e) {
              console.log("Error fetching details: " + e.message);
          }
      };

        return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>

              {/* insert code here to create input elements for the variables email and password */}
              <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
              </div>
              {/* Input element for password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                {/* Error message display */}
                <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>
                            {incorrect}
                        </span>
                {/* insert code here to create a button that performs the `handleLogin` function on click */}
              <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>

               

                <p className="mt-4 text-center">
                    New here? <a href="/app/register" className="text-primary">Register Here</a>
                </p>

            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginPage;
