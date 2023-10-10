import { useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const {login, error, isLoading} = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        await login(email, pass)
        navigate("/menu");
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
