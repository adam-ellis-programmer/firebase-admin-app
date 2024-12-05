// https://firebase.google.com/docs/auth/web/manage-users?_gl=1*rtlsx3*_up*MQ..*_ga*NTAzNjc5NTM0LjE3MTg0NjQ4NzY.*_ga_CW55HF8NVT*MTcxODQ2NDg3Ni4xLjAuMTcxODQ2NDg3Ni4wLjAuMA..
import SectionHeader from '../layout/SectionHeader'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  getStorage,
  ref,
  deleteObject,
  listAll,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import { db } from '../firebase.config'
import { useEffect, useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import PageHeader from '../layout/PageHeader'
const auth = getAuth()

/**
 * 
 * alternative way
 * if (user) {
  console.log(user); // Log basic user info
  user.getIdTokenResult().then((idTokenResult) => {
    console.log(idTokenResult.claims.auth); // Log claims after fetching
    setAdminStatus(idTokenResult.claims.auth);
  });

  https://firebase.google.com/docs/reference/node/firebase.auth.IDTokenResult
}
 */
function TestPage() {
  const [adminStatus, setAdminStatus] = useState({})
  const [idToken, setIdToken] = useState('')
  const [imgURL, setImgURL] = useState('')
  useEffect(() => {
    // calling this fucntion refreshes the token 
    // by calling  user.getIdToken(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        user.getIdTokenResult().then((idTokenResult) => {
          setAdminStatus(idTokenResult.claims.auth)
          setIdToken(idTokenResult.token)
        })
        user.getIdToken(true)
      } else {
        console.log('user is signed out')
        setAdminStatus({})
      }
    })

    // Clean up the subscription
    return () => unsubscribe()
  }, [])
  const [email, setEmail] = useState('')
  const [file, setFile] = useState('')
  const [password, setPassword] = useState('secretPassword')
  const [userData, setUserData] = useState(null) // To store the fetched user data

  const handleSubmit = (e) => {
    e.preventDefault()
    const functions = getFunctions()
    const verify = httpsCallable(functions, 'verify')
    verify({ idToken })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        // Getting the Error details.
        const code = error.code
        const message = error.message
        const details = error.details

        console.log(error)
        // ...
      })
  }

  // const handleSubmit2 = (e) => {
  //   e.preventDefault()
  //   const functions = getFunctions()
  //   const verifyByEmail = httpsCallable(functions, 'verifyByEmail')
  //   verifyByEmail({ email })
  //     .then((result) => {
  //       console.log(result)
  //     })
  //     .catch((error) => {
  //       // Getting the Error details.
  //       console.log(error.message)
  //     })
  // }

  const upload = (e) => {
    e.preventDefault()
    console.log('upladed')
    const storage = getStorage()
    const storageRef = ref(storage, `/profile-images/id/profile-img`)

    const uploadTask = uploadBytesResumable(storageRef, file)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
        })
      }
    )
  }

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    console.log(selectedFile)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    // console.log('deleted...')
    const storage = getStorage()

    // Create a reference to the file to delete
    const desertRef = ref(storage, '/profile-images/id/profile-img')

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log('deleted')
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      })
  }

  // const listall = (e) => {
  //   e.preventDefault()
  //   console.log('list all')
  //   const storage = getStorage()

  //   // Create a reference under which you want to list
  //   const listRef = ref(storage, 'images/IwA5GbEiIBRQBlJDI16gV1oxbUC2/')

  //   // Find all the prefixes and items.
  //   listAll(listRef)
  //     .then((res) => {
  //       res.prefixes.forEach((folderRef) => {
  //         console.log(folderRef)
  //         // All the prefixes under listRef.
  //         // You may call listAll() recursively on them.
  //       })
  //       res.items.forEach((itemRef) => {
  //         console.log(itemRef)
  //         // itemRef.delete()
  //         // All the items under listRef.
  //       })
  //     })
  //     .catch((error) => {
  //       // Uh-oh, an error occurred!
  //     })
  // }

  console.log(adminStatus)
  return (
    <div className="App">
      <PageHeader text={`testing page`} />

      <div className="test-container">
        {/* <form onSubmit={handleSubmit} action="" className="form test-form">
          <SectionHeader text={`click`} />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            type="text"
            placeholder="enter emal"
            disabled
          />
          <div className="form-btn-container">
            <button className="signup-btn">submit</button>
          </div>
        </form> */}

        {/* <form action="" className="form test-form">
          <SectionHeader text={`email`} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            type="text"
            placeholder="enter emal"
          />
          <div className="form-btn-container">
            <button className="signup-btn">submit</button>
          </div>
        </form> */}

        <form onSubmit={upload} className="form test-form">
          <SectionHeader text={`upload img`} />
          <input onChange={onFileChange} type="file" name="" id="" />
          <div className="form-btn-container">
            <button className="signup-btn">submit</button>
          </div>
        </form>

        <form onSubmit={handleDelete} className="form test-form">
          <SectionHeader text={`delete img`} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            type="text"
            placeholder="enter emal"
          />
          <div className="form-btn-container">
            <button className="signup-btn">submit</button>
          </div>
        </form>

        {/* <form onSubmit={listall} className="form test-form">
          <SectionHeader text={`list all`} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            type="text"
            placeholder="enter emal"
          />
          <div className="form-btn-container">
            <button className="signup-btn">submit</button>
          </div>
        </form> */}
      </div>
    </div>
  )
}

export default TestPage
