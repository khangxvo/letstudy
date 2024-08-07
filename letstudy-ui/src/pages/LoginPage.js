import React, { useState } from 'react';
import '../styles/login.css'

const Login = () => {
    const loginURL = 'http://localhost:8080/letstudy/api/login'

    // State to hold the input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        try {
            const response = await fetch(loginURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            // const data = await response.text()
            // console.log(data)

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Login failed');
            } else {
                const data = await response.json()
                const { token, user_id } = data
                console.log(`token: ${token}`) // TODO: delete this after
                console.log(`userID: ${user_id}`) // TODO: delete this after
                setSuccess(`Login successful`)
                setError('')
            }
        } catch (error) {
            setSuccess("")
            console.error("Error during login:", error)
            setError(error.message)
        }

        // Clear error and form
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className='success'>{success}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
