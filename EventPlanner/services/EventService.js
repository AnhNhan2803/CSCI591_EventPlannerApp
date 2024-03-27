// EventPlanner/services/EventService.js
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { app } from '../firebaseConfig';

const db = getFirestore(app);

export const EventService = {
    updateEventCapacity: async (eventId, newCapacity) => {
        try {
            const eventDoc = doc(db, "events", eventId);
            await updateDoc(eventDoc, { capacity: newCapacity });
            return { id: eventId, capacity: newCapacity };

        } catch (error) {
            console.error("Error updating event capacity: ", error);
            throw new Error(error.message);

        }
    },

    getEventDetails: async (eventId) => {
        try {
        const eventDoc = doc(db, "events", eventId);
        const docSnap = await getDoc(eventDoc);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("No such document!");

        }
        } catch (error) {
            console.error("Error getting event details: ", error);
            throw new Error(error.message);

        }
    },

    // Add more methods later
};