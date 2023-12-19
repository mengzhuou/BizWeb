import { Outlet } from 'react-router-dom'
import NavBar from './functions/NavBar'

const Layout = () => {
    return (
        <section className="public">
        <header>
          <NavBar />
        </header>
        <main className="public__main">
          <Outlet />
        </main>
      </section>)
}
export default Layout