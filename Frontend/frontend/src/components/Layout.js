import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Layout = ({update}) => {
    return <div>
    <section className="public">
      <header>
        <NavBar update={update}/>
      </header>
      </section>
    {/* This will render the nested route */}
    <Outlet />
</div>
}
export default Layout