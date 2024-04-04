import { where, query, collection } from 'firebase/firestore';
import { db } from './firebase';


const getUserObjectFromUid = async (uid, verbose=false) => {
  // Assuming firestore is your Firestore instance
  const userRef = doc(firestore, "Users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    if (verbose) console.log("Document data:", docSnap.data());
    return docSnap.data(); // Return the document data if found
  } else {
    console.log("No such document!");
    return null; // Return null or handle as needed if the document doesn't exist
  }
}