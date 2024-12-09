import { Navigate, Outlet } from 'react-router-dom'
import useCheckLogin from '../hooks/useCheckLogin'

// update to use the outlet as update to react router was made
const PrivateRoute = ({ children }) => {
  const { loggedIn, checkingStatus, isAdmin } = useCheckLogin()
  // console.log(loggedIn)

  if (checkingStatus) {
    return <h2>loading ...</h2>
  }
  return loggedIn && isAdmin ? children : <Navigate to="/" />
}

export default PrivateRoute
