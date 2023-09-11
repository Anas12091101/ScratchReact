import { redirect, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import ChatRoom from "./ChatRoom";
import axiosInstance from "../interceptor";
import ChatUsers from "../components/ChatUsers";

function Chat() {
  const { data, profile } = useLoaderData();
  console.log(data, profile);
  return (
    <>
      <ChatUsers users={data} currentUser={profile} />
    </>
  );
}

export async function ChatLoader() {
  let token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login&next=chat");
  }
  let { data } = await axiosInstance.get("profile/get_all_profile");
  let { data: profile } = await axiosInstance.get("profile/get_profile");
  if (data && profile) return { token, data, profile };
  else return redirect("/auth?mode=login&next=chat");
}

export default Chat;
