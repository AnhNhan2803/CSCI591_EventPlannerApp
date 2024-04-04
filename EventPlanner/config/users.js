import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

/**
 * 
 * Gets the user object from firestore given the userId.
 * 
 * @param {string} uid User ID from Firebase auth
 * @param {boolean} verbose (optional) logs success message on successful retrieval. Default is `false`.
 * 
 * @returns Object with attributes: email, isAdmin, isEmailNotification, isPushNotification, netId, profilePictureUrl
 * Note: Some values are null
 */
export const getUserObjectFromUid = async (uid, verbose=false) => {
  // Assuming firestore is your Firestore instance
  const userRef = doc(db, "Users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    if (verbose) console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log(`Search for user ${uid} has failed!`);
    return null;
  }
}

/**
 * 
 * Initializes the user object with Firebase. This is called when a user's account is created for the first time.
 * 
 * @param {UserCredential} userCred User's credential object after registering with Firebase auth
 * @param {string} email User's email
 * @param {boolean} verbose (optional) logs success message on successful retrieval. Default is `false`
 * 
 * @returns void
 */
export const initUserObject = async (userCred, email, verbose=false) => {
  const netId = email.split('@')[0]
  const isAdmin = netId.slice(-1) == 'e' ? true : false
  setDoc(doc(db, "Users", userCred.user.uid), {
    email: email,
    netId: netId,
    // Verify that student email is proper netID, then determines admin based on the optional trailing "e".
    isAdmin: isAdmin,
    profilePictureUrl: null,
    isPushNotification: false,
    isEmailNotification: false,
  }).then(() => {
    if (verbose) console.log("Successfully created user object in Firestore");
  }).catch((err) => {
    setErrorState(err.message)
    console.error("Error creating user object in Firestore", err);
  });
}

/**
 * 
 * @param {string} field Field where change is to be made
 * @param {any} value Value inserted at field
 * @param {boolean} verbose (optional) logs success message on successful retrieval. Default is `false`
 */
export const updateUserField = (uid, field, value, verbose=false) => {
  const userRef = doc(db, "Users", uid);

  updateDoc(userRef, {
    [field]: value,
  }).then(() => {
    if (verbose) console.log(`Successfully updated ${field} with ${value}.`);
  }).catch((err) => {
    console.error("Error updating user document: ", err)
  });
}