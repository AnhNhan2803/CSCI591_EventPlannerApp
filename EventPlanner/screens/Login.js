import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () =>{
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Enter username" />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter password" secureTextEntry/>
          <View style= {{flexDirection: "row", marginLeft: 20, justifyContent: "space-evenly"}}>
            <Button title="Login" onPress={() => navigation.navigate("HomeScreen")} />
            <Button title="Sign Up" onPress={() => navigation.navigate("HomeScreen")} />
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      justifyContent: "center",
      paddingHorizonal: 20,
    },
    form: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5, 
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: "bold",
    },
    input: {
      height: 40,
      borderColor: "#ddd",
      borderWidth: 1,
      marginBottom: 15,
      padding: 10,
      borderRadius: 5,
    }
  });

  export default Login;