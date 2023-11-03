import React from "react";
import { StyleSheet, TextInput, Text,View } from "react-native";
import { AppColor, Black } from "../constants";


type inputType = {
 numeric?: string,
 value : string,
 secureTextEntry?: boolean
 fullWidth?: boolean,
 placeholder?: string,
 onChangeText: (val : string) => void,
 style?: Object,
 error?: string;
}

export default function Input({ style, fullWidth, numeric, value, secureTextEntry, placeholder, onChangeText,error } : inputType) {
    return (
      <>
      <TextInput
            style={[ styles.Input, style, fullWidth ? { width: '100%' } : null ]}
            value={value}
            keyboardType={numeric ? 'numeric' : 'default'}
            secureTextEntry={secureTextEntry || false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor={Black}
        />
       <View style={{width : '93%'}}>
       {/* <Text>hello</Text> */}
        </View> 
      {/* {error && }  */}
      </>
        
    )
}

const styles = StyleSheet.create({
  Input: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: AppColor,
    borderRadius: 55,
    paddingVertical: 5,
    width : 300,
    paddingLeft : 20,
    color: Black
  }
});