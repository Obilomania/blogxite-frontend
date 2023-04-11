import React from 'react'
import { withAuth } from '../HOC'

const AuthenticationTest = () => {
  return (
    <div>This page can be accessed by any logged in User</div>
  )
}

export default withAuth(AuthenticationTest)