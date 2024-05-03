// EventPlanner/services/EventService.js
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
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
      const eventDoc = doc(db, "Events", eventId);
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
   * @returns {Object} Event data
   */
  getEventDetails: async (eventId) => {
    try {
      const eventDoc = doc(db, "Events", eventId);
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

  /**
   * Retrieves all events
   *
   * @returns {Array} Array of event objects
   */
  getAllEvents: async () => {
    try {
      const eventsCollection = collection(db, "Events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const events = [];

      eventsSnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });

      return events;
    } catch (error) {
      console.error("Error getting all events: ", error);
      throw new Error(error.message);
    }
  },
};
