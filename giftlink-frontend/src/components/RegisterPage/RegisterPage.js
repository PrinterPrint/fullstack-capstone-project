import React, { useState } from 'react';

import './RegisterPage.css';

function RegisterPage() {

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // insert code here to create handleRegister function and include console.log
    // handleRegister function to be called on form submit
    const handleRegister = async () => {
        console.log("Register invoked");
        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Email: ${email}`);
        //console.log(`Password: ${password}`);
    }

         return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="register-card p-4 border rounded">
                          <h2 className="text-center mb-4 font-weight-bold">Register</h2>

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

         )//end of return
}

export default RegisterPage;
