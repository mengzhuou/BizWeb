import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from "react";

const Login = () => {
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        navigate("/menu");
    }
    const content = (
        <section className="public">
            <header>
                <h1>Login</h1>
            </header>
            <main className="public__main">
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
