import * as admin from 'firebase-admin'

export const newTimestamp = admin.firestore.Timestamp.fromDate(new Date()).toDate()

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://siteutilstest.firebaseio.com`
})
