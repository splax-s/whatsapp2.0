import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import bg from "../assets/images/BG.png";
import Message from '../components/Message';
import messages from "../assets/data/messages.json";
import InputBox from '../components/InputBox';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatScreen = () => {
    const navigation = useNavigation();
const route = useRoute();
const insets = useSafeAreaInsets();

useEffect(() => {
  navigation.setOptions({ title: route.params.name });
}, [route.params]);
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
    style={styles.bg}
  >
    <ImageBackground source={bg} style={styles.bg}>
       <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
				style={{ padding: 10 }}
				inverted
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
      />
      <InputBox />
    </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    bg: {
        flex: 1,
      },
})
