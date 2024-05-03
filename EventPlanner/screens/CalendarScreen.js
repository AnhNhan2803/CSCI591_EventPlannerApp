import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { EventService } from "../services/EventService";
import BottomNav from "../components/BottomNav";
import CreateButton from "../components/CreateButton";
import { colors } from "../constants/theme";
import { RenderItem } from "../components/RenderItem";

const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selected, setSelected] = useState("");
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await EventService.getAllEvents();
        const markedDates = formatMarkedDates(allEvents);
        setEvents(markedDates);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const formatMarkedDates = (events) => {
    const markedDates = {};
    events.forEach((event) => {
      const eventDate = new Date(event.Date.seconds * 1000)
        .toISOString()
        .split("T")[0];

      if (!markedDates[eventDate]) {
        markedDates[eventDate] = {
          marked: true,
          dotColor: colors.maroon,
          events: [], // Adding an array to store events for each date
        };
      }

      // Add event details into the events array for each date
      markedDates[eventDate].events.push({
        name: event.title,
        description: event.description,
        organizer: event.organizer,
        location: event.location,
        id: event.id, // Include additional details as necessary
      });
    });
    return markedDates;
  };

  const onDayPress = (day) => {
    setSelected(day.dateString);
    const eventsForDay = events[day.dateString]
      ? events[day.dateString].events
      : [];
    setSelectedDayEvents(eventsForDay);
    setModalVisible(eventsForDay.length > 0);
  };

  const calendarTheme = {
    calendarBackground: colors.white,
    textSectionTitleColor: colors.dark,
    dayTextColor: colors.black,
    todayTextColor: colors.red,
    selectedDayTextColor: colors.white,
    monthTextColor: colors.maroon,
    selectedDayBackgroundColor: colors.maroon,
    arrowColor: colors.maroon,
    dotColor: colors.maroon,
    selectedDotColor: colors.white,
    textDisabledColor: colors.light,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Calendar
          markedDates={{
            ...events,
            [selected]: {
              ...events[selected],
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: colors.white,
            },
          }}
          theme={calendarTheme}
          onDayPress={onDayPress}
        />
        <EventModal
          visible={modalVisible}
          events={selectedDayEvents} // Ensure this is always an array
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>
      <CreateButton />
      <BottomNav />
    </SafeAreaView>
  );
};

const EventModal = ({ visible, events, onClose }) => {
  const renderItem = ({ item }) => (
    <View style={styles.modalEventItem}>
      <Text style={styles.modalEventTitle}>{item.name}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Organizer: {item.organizer}</Text>
      <Text>Location: {item.location}</Text>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalEventItem: {
    backgroundColor: colors.wheat,
    borderRadius: 8,
    padding: 20,
    marginVertical: 8,
    width: 300, // Set a fixed width or make it responsive based on your design
  },
  modalEventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.maroon,
  },
  closeButton: {
    backgroundColor: colors.maroon,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
  },
});

export default CalendarScreen;
