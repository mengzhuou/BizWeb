import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Layout = ({updateCookie}) => {
    return (
        <section className="public">
        <header>
          <NavBar updateCookie={updateCookie}/>
        </header>
        <main className="public__main">
          <Outlet />
        </main>
      </section>)
}
export default Layout