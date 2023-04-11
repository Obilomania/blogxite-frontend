import React from 'react'
import { withAdminAuth } from '../HOC';

const AuthenticationTestAdmin = () => {
  return <div>This page can be accessed by if logged in User role is ADMIN</div>;
}

export default withAdminAuth(AuthenticationTestAdmin)