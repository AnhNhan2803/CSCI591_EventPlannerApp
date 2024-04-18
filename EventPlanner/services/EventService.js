// EventPlanner/services/EventService.js
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { app } from "../config/firebase.js";

const db = getFirestore(app);

export const EventService = {
  /**
   * Update the event capacity
   *
   * @param {string} eventId
   * @param {int} newCapacity
   * @returns {string, int} id, capacity
   */

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

  /**
   * Retrieves the event details
   *
   * @param {string} eventId
   * @returns {Object} Snapshot data
   */
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
