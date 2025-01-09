import { useState, useEffect } from 'react'
// https://firebase.google.com/docs/reference/js/auth.user
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const CheckLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const checkAuth = async () => {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log(user)
          setUser(user)
          setLoggedIn(true)

          const checkAdmin = await user.getIdTokenResult()
          const claims = checkAdmin?.claims

          if (claims?.auth?.admin === true) {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
          }
          const uid = user.uid
        }

        setCheckingStatus(false)
      })
    }

    checkAuth()
  }, [])
  return {
    loggedIn,
    isAdmin,
    checkingStatus,
    user,
  }
}

export default CheckLogin
