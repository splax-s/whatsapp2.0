import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import chats from "../assets/data/chats.json";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "stretch",
    paddingHorizontal: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
