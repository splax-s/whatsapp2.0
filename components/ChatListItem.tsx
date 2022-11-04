import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { useEffect, useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../src/graphql/subscriptions";


const ChatListItem = ({chat}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      // Loop through chat.users.items and find a user that is not us (Authenticated user)
      const userItem = chat.Users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });

    return () => subscription.unsubscribe();
  }, [chat.id]);

  return (
    <Pressable
    onPress={() =>
      navigation.navigate("Chat", { id: chat.id, name: user?.name })
    }
    style={styles.container}
  >
    <Image source={{ uri: user?.image }} style={styles.image} />

    <View style={styles.content}>
      <View style={styles.row}>
        <Text style={styles.name} numberOfLines={1}>
          {user?.name}
        </Text>
        <Text style={styles.subTitle}>
          {dayjs(chat.LastMessage?.createdAt).fromNow(true)}
        </Text>
      </View>

      <Text numberOfLines={2} style={styles.subTitle}>
        {chat.LastMessage?.text}
      </Text>
    </View>
  </Pressable>
  )
}

export default ChatListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch",
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
      },
      image: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 30,
        marginRight: 10,
      },
      content: {
        flex: 1,
        borderBottomColor: "lightgray",
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      row: {
        flexDirection: "row",
        marginBottom: 5,
      },
      name: {
        fontWeight: "bold",
        flex: 1,
      },
      subTitle: {
        color: "grey",
      },
})
