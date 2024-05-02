import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
} from 'react-native';

import CreateForm from "../services/CreateService";
import { colors } from "../constants/theme";
import BgWrapper from "../components/BgWrapper";


const CreateScreen = () => {
  return(
    <BgWrapper>
      <Image source={require('../assets/wave-spacer.png')} />
      <View style={styles.View}>
        <CreateForm style={styles.Create}/>
      </View>
    </BgWrapper>
  );
};
 
export default CreateScreen;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  Create: {
    height: "100%",
    
  }
});