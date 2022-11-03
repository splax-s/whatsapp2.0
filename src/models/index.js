// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatRoom, User, Message, ChatRoomUser } = initSchema(schema);

export {
  ChatRoom,
  User,
  Message,
  ChatRoomUser
};