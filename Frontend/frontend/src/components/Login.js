import { Link } from 'react-router-dom'
import React, { useState } from "react";

const Login = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Login</h1>
            </header>
            <main className="public__main">
                <p>Login function</p>
            </main>
            <footer>
                <Link to="/public">Welcome</Link>
            </footer>
        </section>

    // )
    // return content
}
export default Login