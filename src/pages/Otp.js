import { redirect } from "react-router-dom";
import OtpForm from "../components/OtpForm";

function OtpPage() {
  return <OtpForm />;
}

export default OtpPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email");

  const data = await request.formData();
  data.append("email", email);

  var object = {};
  data.forEach((value, key) => (object[key] = value));

  var body = JSON.stringify(object);

  console.log(body);
  let url = "http://127.0.0.1:8000/";
  url += "user/check_otp/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  if (response.ok) {
    const data = await response.json();
    let jwt_token = data["status"]["access"];
    localStorage.setItem("token", jwt_token);
    return redirect("/");
  } else {
    return response;
  }
}
