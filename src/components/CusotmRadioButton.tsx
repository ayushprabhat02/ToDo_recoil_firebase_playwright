import {StyleSheet, Text, TextInput, View, Pressable} from 'react-native';
import React, {useState} from 'react';

const  CustomRadioButton = (props:any) => {
    return (
        <Pressable testID='toggle_test' onPress={props.onPress} style={[{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#000',
              }}/>
              : null
          }
        </Pressable>
    );
  }

  export default CustomRadioButton