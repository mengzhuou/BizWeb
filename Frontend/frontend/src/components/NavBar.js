import React from "react";
import { useSendLogoutMutation } from './authApiSlice'
import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'


const NavBar = () => {
const navigate = useNavigate()
const { pathname } = useLocation()

const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation()

useEffect(() => {
  if (isSuccess) navigate('/')
}, [isSuccess, navigate])

if (isLoading) return <p>Logging Out...</p>

if (isError) return <p>Error: {error.data?.message}</p>


const content = (
    <div>
      <Link className="float-right topNavBar" onClick={sendLogout}>
        Log Out
      </Link>
      <Link to="/menu" className="float-right topNavBar">
        Menu
      </Link>
      <Link to="/managementMenu" className="float-right topNavBar">
        Management
      </Link>
    </div>
  );
  return content
}
export default NavBar