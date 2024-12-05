import { collection, addDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from './firebase.config'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'


function App() {
  useEffect(() => {
    const test = async () => {
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          first: 'Alan',
          middle: 'Mathison',
          last: 'Turing',
          born: 1912,
        })

        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
    // test()
  }, [])

  const [email, setEmail] = useState('hell0@gmail.com')
  const [password, setPassword] = useState('111111')



  const handleClick = () => {
    console.log('hello')
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }

  const handleClick2 = () => {
    console.log('object')
  }
  return (
    <div className="App">
      <h4>hello</h4>
      {/* <button onClick={handleClick}>click</button>  */}
      <br></br>
      <br></br>
      <br></br>
      <button onClick={handleClick2}>click2</button>
    </div>
  )
}

export default App
