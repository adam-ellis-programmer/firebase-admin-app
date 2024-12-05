import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase.config'

// get all users where name == lisa
// get all sales records
// get all sales where manager === manager
// get all sales where manager === manager
// lookup checkbox loop project
export async function getAllUsers(collectionName, params) {
  const users = []
  const q = query(collection(db, 'cities'), where('name', '==', 'lisa'))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    users.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
  })

  return users
}
let manager
let region
const qManager = query(
  collection(db, 'users'),
  where('reports-to', '==', manager),
  where('region', '===', region),
  where('region', '===', region),

  where('height', '>', 60),
  where('height', '<', 70),
  where('age', '<', 70)
)
