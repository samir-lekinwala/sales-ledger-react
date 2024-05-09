import request from 'superagent'
import * as models from '../models/items.tsx'

const rootUrl = '/api/v1'

export async function postFormData(data: models.item) {
  return request.post(rootUrl + '/bought').send(data)
}
export async function patchFormData(data: models.item) {
  console.log('data from fruits', data)
  return request.patch(rootUrl + `/bought/${data.id}`).send(data)
}
export async function getAllItems() {
  return request.get(rootUrl + '/bought')
}
export async function getItem(id: number) {
  return request.get(rootUrl + `/bought/edit/${id}`)
}
export async function deleteItem(id: number) {
  return request.delete(rootUrl + `/delete/${id}`)
}

// import firebase from 'firebase/app' // Assuming you're using Firebase SDK version 9 or higher
// import 'firebase/firestore' // Import Firestore module separately

// import { initializeApp } from 'firebase/app'

// // import { getAnalytics } from 'firebase/analytics'

// // Initialize Firebase app
// const firebaseConfig = {
//   apiKey: 'AIzaSyBGccR6BVXaUf89Ert-ISXIJrtaTlAsRVA',

//   authDomain: 'sales-ledger-fe5dc.firebaseapp.com',

//   databaseURL:
//     'https://sales-ledger-fe5dc-default-rtdb.asia-southeast1.firebasedatabase.app',

//   projectId: 'sales-ledger-fe5dc',

//   storageBucket: 'sales-ledger-fe5dc.appspot.com',

//   messagingSenderId: '129524958020',

//   appId: '1:129524958020:web:d151c88d1cd9235a030d11',

//   measurementId: 'G-KPY1SD8KTY',
// }

// const app = initializeApp(firebaseConfig)

// // const analytics = getAnalytics(app)

// firebase.initializeApp(firebaseConfig)

// const db = firebase.firestore()

// export async function postFormData(data) {
//   try {
//     await db.collection('items').add(data)
//     return { success: true }
//   } catch (error) {
//     console.error('Error adding item:', error)
//     return { success: false, error }
//   }
// }

// export async function getAllItems() {
//   try {
//     const querySnapshot = await db.collection('items').get()
//     const items = []
//     querySnapshot.forEach((doc) => {
//       items.push({ id: doc.id, ...doc.data() })
//     })
//     return items
//   } catch (error) {
//     console.error('Error getting items:', error)
//     return []
//   }
// }

// export async function deleteItem(id) {
//   try {
//     await db.collection('items').doc(id).delete()
//     return { success: true }
//   } catch (error) {
//     console.error('Error deleting item:', error)
//     return { success: false, error }
//   }
// }
