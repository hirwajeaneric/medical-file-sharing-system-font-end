import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminAuthentication = () => {
  return (
    <div>
      <h1>Authentication admin</h1>
      <Outlet/>
    </div>
  )
}

export default AdminAuthentication