import { useLoaderData } from "react-router-dom";
import axiosInstance from "../interceptor";
import { getAuthToken } from "../utils/auth";
import { redirect } from "react-router-dom";

function HomePage() {
  const data = useLoaderData()["data"];
  const username = data.user.name;
  const email = data.user.email;
  const avatar = data.avatar;
  const bio = data.bio;

  return (
    <>
      <h1>Username: {username}</h1>
      <h2>Email: {email}</h2>
      <img
        className="avatar"
        src={process.env.REACT_APP_BACKEND_URL.slice(0, -1) + avatar}
        alt="Profile pic"
      ></img>

      <h2>Bio: {bio}</h2>
    </>
  );
}

export async function homeLoader() {
  let token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  let response = await axiosInstance.get("profile/get_profile");
  if (!response.ok) {
    return response;
  }
  let data = response.json();
  return data;
}

export default HomePage;
