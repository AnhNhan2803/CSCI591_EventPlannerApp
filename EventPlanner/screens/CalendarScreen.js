import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { EventService } from "../services/EventService";
import BottomNav from "../components/BottomNav";
import CreateButton from "../components/CreateButton";
import { colors } from "../constants/theme";

const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Fetch events from the EventService when the component mounts
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
      // Assuming each event has a 'date' property representing the event date
      const eventDate = event.date;
      markedDates[eventDate] = { marked: true }; // Customize as needed
    });
    return markedDates;
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
    selectedDayBackgroundColor: colors.maroon,
    // textMonthFontFamily: "OpenSans-Regular", // Customize as needed
    // textDayFontFamily: "OpenSans-Regular", // Customize as needed
    // textDayHeaderFontFamily: "OpenSans-Bold", // Customize as needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Calendar
          // Customize the calendar component as needed
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
          theme={calendarTheme} // Apply the custom theme
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
        />
      </ScrollView>
      <CreateButton />
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.maroon,
  },
});

export default CalendarScreen;
