import SubForm from "../components/SubForm";
import { getAuthToken } from "../utils/auth";
import { redirect } from "react-router-dom";

function SubscriptionPage() {
  return <SubForm />;
}

export default SubscriptionPage;

export async function loader() {
  let token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  let membership_url = "http://127.0.0.1:8000/subscription/get_memberships/";
  const response = await fetch(membership_url);
  if (!response.ok) {
    return response;
  }
  let user_membership_url =
    "http://127.0.0.1:8000/subscription/user_membership/";
  const user_response = await fetch(user_membership_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  let data = {};
  data["user_subscription"] = await user_response.json();
  data["memberships"] = await response.json();
  console.log(data);
  return data;
}
