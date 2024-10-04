import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/UserContext'

const Root = () => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return (<Navigate to="/" replace="true" />);
  }

  return (
    <div className='mt-5'>
        <Outlet/>
    </div>
  )
}

export default Root