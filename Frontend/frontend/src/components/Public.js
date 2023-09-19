import { Link } from 'react-router-dom'


const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Bizweb</span></h1>
            </header>
            <main className="public__main">
                <p>TBD</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public