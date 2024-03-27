// EventPlanner/components/EventItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const EventItem = ({ event, onRSVP }) => {
    return (
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{event.name}</Text>
        <Text>{event.description}</Text>
        <TouchableOpacity onPress={() => onRSVP(event.id)}>
            <Text>RSVP to this event</Text>
        </TouchableOpacity>
        </View>
    );
};

export default EventItem;
