import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from "react";


const TagPicker = () => {

    const [open, setOpen] = useState(false);
    const { field } = useController({ control, name});
    const [items, setItems] = useState([
        {id: 1, title: 'Sports', value: 'sports'},
        {id: 2, title: 'Social', value: 'social'}, 
        {id: 3, title: 'Guest Speaker', value: 'guest-speaker'},
        {id: 4, title: 'Free food', value: 'free-food'},
            
    ]);
       
    return (
        <DropDownPicker
            open={open}
            value={field.value}
            items={items}
            setOpen={setOpen}
            setValue={ tag => {
                 const newValue = tag 
                 (field.value) 
            field.onChange(newValue)
        }}
            setItems={setItems}
            mode="BADGE"
            placeholder={'Select some tags'}
        />
    );
}

export default TagPicker;