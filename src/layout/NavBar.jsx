import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaBeer, FaBars } from 'react-icons/fa'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import logo from '../imgs/firebase logo-1.png'
const NavBar = () => {
  const navigate = useNavigate()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileURL, setProfileURL] = useState('')
  const handleNavOpen = () => {
    setIsNavOpen((prev) => !prev)
  }

  const auth = getAuth()
  // console.log(auth && auth?.currentUser?.uid)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setProfileURL(user.photoURL)
        // console.log(user.photoURL)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        // console.log(user)

        // ...
      } else {
        // User is signed out
        setIsLoggedIn(false)
        // safty if do not want to show any other pages

        // ...
      }
    })

    return () => {}
  }, [auth, isLoggedIn])

  const handleLogout = () => {
    console.log('logged out')
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setIsNavOpen(false)
        navigate('/')
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <header>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <div className="logo">
              <Link to="/">
                <img className="nav-logo" src={logo} alt="" />
              </Link>
            </div>

            <button onClick={handleNavOpen} className="toggle-nav">
              <FaBars icon="fa-solid fa-bars" />
            </button>
            <ul className="top-nav-ul">
              <li className="top-nav-li">
                <Link className="top-nav-link" to="/">
                  Home
                </Link>
              </li>
              {!isLoggedIn ? (
                <li className="top-nav-li">
                  <Link className="top-nav-link" to="/sign-in">
                    Signin
                  </Link>
                </li>
              ) : (
                <li onClick={handleLogout} className="nav-log-out-btn top-nav-li">
                  logout
                </li>
              )}

              <li className="top-nav-li">
                <Link className="top-nav-link" to="/admin">
                  admin
                </Link>
              </li>
              <li className="top-nav-li">
                <Link className="top-nav-link" to="/me">
                  @me
                </Link>
              </li>

              {isLoggedIn && (
                <img src={profileURL} alt="" className="top-nav-profile-img" />
              )}
            </ul>
          </div>

          <div className="links-container"></div>
        </div>

        <ul className={`mobile-nav-ul  ${isNavOpen && 'show-nav'} `}>
          <li className="mobile-nav-li">
            <Link onClick={() => setIsNavOpen(false)} className="mobile-nav-link" to="/">
              Home
            </Link>
          </li>
          {!isLoggedIn ? (
            <li className="top-nav-li">
              <Link
                onClick={() => setIsNavOpen(false)}
                className="mobile-nav-link"
                to="/sign-in"
              >
                Signin
              </Link>
            </li>
          ) : (
            <li onClick={handleLogout} className="nav-log-out-btn mobile-nav-link">
              logout
            </li>
          )}

          <li className="nav-li">
            <Link
              onClick={() => setIsNavOpen(false)}
              className="mobile-nav-link"
              to="/admin"
            >
              admin
            </Link>
          </li>

          <li className="top-nav-li">
            <Link
              onClick={() => setIsNavOpen(false)}
              className="mobile-nav-link"
              to="/me"
            >
              @me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
