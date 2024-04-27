


function TimePicker (control, name) {


return(
<DateTimePicker
style={styles.dateTimePicker}
testID="dateAndTime"
value={date}
mode="time"
is24Hour={true}
onChange={onChange}
/>
);

}

export default TimePicker;