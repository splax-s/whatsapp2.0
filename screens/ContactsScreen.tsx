import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import chats from '../assets/data/chats.json';
import ContactListItem from '../components/ContactListItem';
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../src/graphql/queries";


const ContactsScreen = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((result) => {
          setUsers(result.data?.listUsers?.items);
        });
      }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactListItem user={item} />}
      style={{ backgroundColor: 'white' }}
    />
  )
}

export default ContactsScreen

const styles = StyleSheet.create({})
