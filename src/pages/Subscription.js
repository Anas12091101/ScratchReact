import SubForm from "../components/SubForm";

function SubscriptionPage() {
  return <SubForm />;
}

export default SubscriptionPage;

export async function loader() {
  let url = "http://127.0.0.1:8000/subscription/get_memberships/";
  const response = await fetch(url);
  if (!response.ok) {
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
}
