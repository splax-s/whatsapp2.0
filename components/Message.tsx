import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

const Message = ({message}) => {
    const [isMe, setIsMe] = useState(false);

    useEffect(() => {
      const isMyMessage = async () => {
        const authUser = await Auth.currentAuthenticatedUser();

        setIsMe(message.userID === authUser.attributes.sub);
      };

      isMyMessage();
    });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? "#DCF8C5" : "white",
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%",

            // Shadows

      },
      message: {},
      time: {
        alignSelf: "flex-end",
        color: "grey",
      },
})
