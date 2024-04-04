import { db } from './firebase';

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

export const initUserObject = (userCred, verbose=false) => {
  setDoc(doc(db, "Users", userCred.user.uid), {
    email: email,
    netId: email.split('@')[0],
    // Verify that student email is proper netID, then determines admin based on the optional trailing "e"
    admin: (email.split('@')[email.split('@')[0].length - 1] === 'e') ? true : false,
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
