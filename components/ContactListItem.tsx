import { Text, Image, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createChatRoomUser } from "../src/graphql/mutations";
import { getCommonChatRoomWithUser } from "../services/chatRoomService";

const ContactListItem = ({ user }) => {
    const navigation = useNavigation();

    const onPress = async () => {
      // Check if we already have a ChatRoom with user
      const existingChatRoom = await getCommonChatRoomWithUser(user.id);
      if (existingChatRoom) {
        console.log(existingChatRoom?.id);
        navigation.navigate("Chat", { id: existingChatRoom.id });
        return;
      }

      // Create a new Chatroom
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );
    //   console.log(newChatRoomData);
      if (!newChatRoomData.data?.createChatRoom) {
        console.log("Error creating the chat error");
      }
      const newChatRoom = newChatRoomData.data?.createChatRoom;

      // Add the clicked user to the ChatRoom
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: { chatRoomID: newChatRoom.id, userID: user.id },
        })
      );

      // Add the auth user to the ChatRoom
      const authUser = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
        })
      );

      // navigate to the newly created ChatRoom
      navigation.navigate("Chat", { id: newChatRoom.id });
    };


  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 5,
    height: 70,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  subTitle: {
    color: 'gray',
  },
  content: {
    flex: 1,
  }
});

export default ContactListItem;
