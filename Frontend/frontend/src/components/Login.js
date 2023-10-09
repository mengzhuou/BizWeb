import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from "react";

const Login = ({update}) => {
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        update(email);
        navigate("/");
    }
    const content = (
        <section className="public">
            <main className="public__main">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} type="password" onChange={(e) => setPass(e.target.value)} placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            </main>
        </section>
        );
        return content;
};
export default Login
