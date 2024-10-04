import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/UserContext';

const GuestRoot = () => {
    const { authenticate } = useAuth();
    if ( authenticate) {
        return (<Navigate to="/scrape" replace="true" />);
      }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default GuestRoot