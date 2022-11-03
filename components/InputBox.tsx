import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';


const InputBox = () => {
    const [newMessage, setNewMessage] = useState('');
    const onSend = () => {
        console.warn("Send a new message");
      };
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <AntDesign name="plus" size={24} color="royalblue" />
      <TextInput
  value={newMessage}
  onChangeText={setNewMessage}
  multiline
  style={styles.input}
/>
      <MaterialIcons style={styles.send} name="send" size={24} color="white" onPress={onSend}/>
    </SafeAreaView>
  )
}

export default InputBox

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "whitesmoke",
        padding: 5,
        alignItems: "center",
        justifyContent: 'center',
      },
      input: {
        fontSize: 18,
        width: "75%",
        backgroundColor: "white",
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
      },
      send: {
        backgroundColor: "royalblue",
        padding: 7,
        borderRadius: 20,
        overflow: "hidden",
      },
})
