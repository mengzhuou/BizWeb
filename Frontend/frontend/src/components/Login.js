import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/menu');
    }
    const content = (
        <section className="public">
            <header>
                <h1>Login</h1>
            </header>
            <main className="public__main">
                <p>Login function</p>
                <button onClick={handleLogin}>Login</button>
            </main>
            <footer>
                <Link to="/">Welcome</Link>
            </footer>
        </section>

    )
    return content
}
export default Login