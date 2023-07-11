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
  let url = "http://127.0.0.1:8000/subscription/get_memberships/";
  const response = await fetch(url);
  if (!response.ok) {
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
}
