// EventPlanner/services/RSVPService.js
import { getFirestore, collection, addDoc, where, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig';

const db = getFirestore(app);

export const RSVPService = {
  /**
   * Sends RSVP status to Firestore
   * 
   * @param {Object} rsvp RSVP Object storing id and status 
   * @returns 
   */
  storeRSVPInfo: async (rsvp) => {
    try {
      const docRef = await addDoc(collection(db, "rsvps"), rsvp);
      return { id: docRef.id, ...rsvp };
    } catch (error) {
      console.error("Error adding RSVP: ", error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves RSVP information from Firestore
   * 
   * @param {string} rsvpId Id for RSVP
   * @returns {Object} RSVP Object
   */
  retrieveRSVPs: async (rsvpId) => {
    try {
      const q = query(collection(db, "rsvps"), where("eventId", "==", rsvpId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    } catch (error) {
      console.error("Error retrieving RSVPs: ", error);
      throw new Error(error.message);

    }
  },

  /**
   * Updates RSVP status
   * 
   * @param {string} rsvpId 
   * @param {boolean} newStatus 
   * @returns {string, boolean} Updated RSVP object
   */
  updateRSVPStatus: async (rsvpId, newStatus) => {
    try {
      const rsvpDoc = doc(db, "rsvps", rsvpId);
      await updateDoc(rsvpDoc, { status: newStatus });
      return { id: rsvpId, status: newStatus };
    } catch (error) {
      console.error("Error updating RSVP status: ", error);
      throw new Error(error.message);
    }
  },
  
  // Add more methods later
};
