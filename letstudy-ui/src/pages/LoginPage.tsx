import React, { useEffect, useState } from 'react'
import '../styles/LoginPage.css'
import { getURL, postURL } from '../functions/urlMethods';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // const loginURL = 'http://localhost:8080/letstudy/api/login'
    const baseURL = 'http://localhost:3000/' //! Change this when deploy
    const [loginURL, setLoginURL] = useState('')

    // state variables and their set function
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const getLoginURL = async (url: string) => {
        try {
            const res = await getURL(url)

            if (!res.ok) {
                const errorData = await res.text()
                // TODO may add log to record error
                throw new Error(errorData || 'Failed to get login URL')
            }


            const result = await res.json()
            setLoginURL(result.serverURL + result.loginURL)
        } catch (e) {
            // TODO may add log to record error
            throw e
        }
    }

    getLoginURL(baseURL)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!email || !password) {
            setError('Both fields are required')
            return
        }

        try {
            const res = await postURL(loginURL, JSON.stringify({ email, password }))

            if (!res.ok) {
                setSuccess('')
                const errorData = await res.text();
                setError(`Login failed: ${errorData}`);
                console.error('Login error:', errorData);
            } else {
                setError('')
                const { token, user_id } = await res.json();
                console.log(`token: ${token}`)
                console.log(`user_id: ${user_id}`)
                setSuccess("Login successful!");
                navigate('/homepage')
            }

        } catch (error) {
            setSuccess("")
            setError("Error during login!")
            console.error("Error during login:", error)
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

export default LoginPage;