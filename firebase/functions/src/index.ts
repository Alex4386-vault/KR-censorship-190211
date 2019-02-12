import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const getList = functions.region("asia-northeast1").https.onRequest((req: any, resp: any) =>
    db.collection('domains').doc('domains').get().then((data: any) => {
        const domains = [];
        const firestoreData = data.data();
        for (const key of Object.keys(firestoreData)) {
            domains.push(firestoreData[key])
        }
        resp.json(domains)
    }).catch((err: Error) => {
        console.log('Error getting documents', err);
    })
);
