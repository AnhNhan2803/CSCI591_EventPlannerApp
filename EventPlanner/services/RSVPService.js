// EventPlanner/services/RSVPService.js
import { getFirestore, collection, addDoc, where, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig';

const db = getFirestore(app);

export const RSVPService = {
    storeRSVPInfo: async (rsvp) => {
        try {
            const docRef = await addDoc(collection(db, "rsvps"), rsvp);
            return { id: docRef.id, ...rsvp };

        } catch (error) {
            console.error("Error adding RSVP: ", error);
            throw new Error(error.message);

        }
    },

    retrieveRSVPs: async (eventId) => {
        try {
            const q = query(collection(db, "rsvps"), where("eventId", "==", eventId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        } catch (error) {
            console.error("Error retrieving RSVPs: ", error);
            throw new Error(error.message);

        }
    },

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
