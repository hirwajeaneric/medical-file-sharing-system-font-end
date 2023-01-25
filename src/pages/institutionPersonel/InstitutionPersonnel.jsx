import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

const InstitutionPersonnel = () => {
  const params = useParams();
  
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default InstitutionPersonnel