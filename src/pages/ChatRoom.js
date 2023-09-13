import { redirect, useLoaderData, useParams } from "react-router-dom";

import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import ChatBox from "../components/ChatBox";
import { useEffect, useState } from "react";
import axiosInstance from "../interceptor";
import { getAuthToken } from "../utils/auth";

function ChatRoom() {
  const { token, prevMessages, profile } = useLoaderData();

  const { roomName } = useParams();
  const socketUrl =
    process.env.REACT_APP_SOCKET_URL + roomName + `/?token=${token}`;
  const [messages, setMessages] = useState(prevMessages);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessages((prev) => prev.concat(JSON.parse(lastMessage.data)));
    }
  }, [lastMessage, setMessages]);

  async function onSendHandler(files, msg) {
    let file_types = files.map((file) => file.type);

    if (files.length > 0) {
      try {
        let { data } = await axiosInstance.post(
          "chat/upload_file",
          { files: files, types: file_types },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        data.ids.map((id) => {
          let filemsg = { type: "chat.file", message: id, profile: profile };
          sendMessage(JSON.stringify(filemsg));
        });
      } catch {}
    }
    if (msg) {
      msg = { type: "text", message: msg, profile: profile };

      sendMessage(JSON.stringify(msg));
    }
  }

  return <ChatBox messages={messages} onSendHandler={onSendHandler}></ChatBox>;
}
export async function ChatRoomLoader({ params }) {
  let token = getAuthToken();
  let roomName = params["roomName"];
  let response;
  if (!token) {
    return redirect("/auth?mode=login&next=chat");
  }
  let body = {
    room: roomName,
  };
  try {
    response = await axiosInstance.post("chat/validate_room", body);
  } catch {
    return redirect("/chat");
  }
  let { data: prevMessages } = response;
  if (!prevMessages) return redirect("/auth?mode=login&next=chat");
  prevMessages = prevMessages["messages"];

  let { data } = await axiosInstance.get("profile/get_all_profile");
  let { data: profile } = await axiosInstance.get("profile/get_profile");
  if (data && profile) return { token, data, profile, prevMessages };
  else return redirect("/auth?mode=login&next=chat");
}

export default ChatRoom;
