import { Navigate, Outlet } from 'react-router-dom'
import useCheckLogin from '../hooks/useCheckLogin'

// NOT OUTLET AS WE NEST IN ELEMENT IN APP.JS
const PrivateRoute = ({ children }) => {
  const { loggedIn, checkingStatus, isAdmin } = useCheckLogin()
  console.log(loggedIn)

  if (checkingStatus) {
    return <h2>loading ...</h2>
  }
  return loggedIn && isAdmin ? children : <Navigate to="/" />
}

export default PrivateRoute
