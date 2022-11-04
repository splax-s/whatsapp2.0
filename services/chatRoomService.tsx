import { API, graphqlOperation, Auth } from "aws-amplify";

export const getCommonChatRoomWithUser = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();
  //console.log(userID)

  // get all chat room of user1
  const response = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
  );

  const chatRooms = response.data?.getUser?.chatrooms?.items || [];
  //console.log(response.data?.getUser?.chatrooms?.items )


  const chatRoom = await chatRooms.find((chatRoomItem) => {
   // console.log(chatRoomItem)
    return (
        chatRoomItem.chatRoom.Users.items.length === 2 &&
        chatRoomItem.chatRoom.Users.items.some(
          (userItem) => {userItem.user.id === userID}
        )
      );
  });

  return chatRoom;
};

export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      chatrooms {
        items {
          chatRoom {
            id
            Users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
