// EventPlanner/components/RSVPButton.js
import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { RSVPService } from '../services/RSVPService';

const RSVPButton = ({ eventId, userId }) => {
    const handleRSVP = async () => {
        try {
            await RSVPService.storeRSVPInfo({
                eventId,
                userId,
                status: 'Attending',
            });
            Alert.alert("Success", "You have successfully RSVP'd!");
        } catch (error) {
            Alert.alert("Error", "Unable to RSVP. Please try again later.");
        }
    };

    return (
        <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }} onPress={handleRSVP}>
        <Text style={{ color: 'white', textAlign: 'center' }}>RSVP</Text>
        </TouchableOpacity>
    );
};

export default RSVPButton
