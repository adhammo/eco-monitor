import * as admin from "firebase-admin";
import { fireConfig } from "./config";

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fireConfig!)),
});

console.log("[monitor]: initialized firebase.");

const db = admin.firestore();

console.log("[monitor]: initialized firestore.");

export const saveTemp = (temp: number) => {
  db.collection("temperature")
    .add({
      data: temp,
      stamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => console.log(`[monitor]: saved temperature message.`));
};
