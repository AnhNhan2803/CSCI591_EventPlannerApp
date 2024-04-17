// EventPlanner/utils/Utils.js
/**
 * Check if the number of RSVPs has reached the event's capacity.
 * 
 * @param {number} eventCapacity - The maximum number of attendees for the event.
 * @param {number} rsvpCount - The current number of RSVPs.
 * @return {boolean} - True if the event is full, false otherwise.
*/
export const isEventFull = (eventCapacity, rsvpCount) => {
    return rsvpCount >= eventCapacity;
};
  
/**
 * Formats a JavaScript Date object into a readable string.
 * 
 * @param {Date} date - The date to format.
 * @return {string} - The formatted date string.
*/
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};

/**
 * Retrieves the RSVP status for a specific student and event.
 * 
 * @param {Array} rsvps - The list of RSVPs for the event.
 * @param {number} studentId - The ID of the student.
 * @return {string|null} - The RSVP status if found, or null if the student hasn't RSVPed.
*/
export const getRSVPStatus = (rsvps, studentId) => {
    const rsvp = rsvps.find(r => r.studentId === studentId);
    return rsvp ? rsvp.status : null;
};
  