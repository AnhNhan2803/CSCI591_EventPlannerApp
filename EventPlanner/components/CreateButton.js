//TODO
//make sure this works with overall navigation
//insert home screen and calendar screen


import {Button } from 'react-native';

const createButton = ({ navigation }) => {

    return(
        <Button
        title="+"
        onPress={() => navigation.navigate('Create')}
      />
    );
}

export default createButton;