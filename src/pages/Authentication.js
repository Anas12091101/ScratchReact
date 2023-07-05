import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  const data = await request.formData();
  var object = {};
  data.forEach((value, key) => (object[key] = value));
  var body = JSON.stringify(object);

  let url = "http://127.0.0.1:8000/";
  url = url + "user/";
  if (mode === "login") {
    url += "login/";
  } else {
    url += "register_user/";
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    return response;
  }
  console.log(response);

  const resData = await response.json();
  console.log(resData);
  if (mode === "login") {
    if (resData.status === "GA" || resData.status === "Email") {
      return redirect(`/otp?email=${JSON.parse(body)["email"]}`);
    } else {
      let jwt_token = resData.status;
      console.log(jwt_token);
      return redirect("/home");
    }
  } else {
    return redirect("/auth?mode=login");
  }
}
