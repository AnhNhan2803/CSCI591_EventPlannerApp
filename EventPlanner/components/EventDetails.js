// EventPlanner/components/EventDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { EventService } from '../services/EventService';
import RSVPButton from './RSVPButton';

const EventDetails = ({ eventId }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
        try {
            const eventData = await EventService.getEventDetails(eventId);
            setEvent(eventData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (!event) {
        return <Text>No event found.</Text>;
    }

    return (
        <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{event.name}</Text>
        <Text>{event.description}</Text>
        <Text>Date: {event.date}</Text>
        {/* Additional event details as needed */}

        <RSVPButton eventId={event.id} />
        </View>
    );
};

export default EventDetails;