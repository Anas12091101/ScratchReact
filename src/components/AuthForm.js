import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import { useState } from "react";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [otp, setOtp] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    if (!otp) {
      const data = new FormData(event.target);
      var object = {};
      data.forEach((value, key) => (object[key] = value));
      var body = JSON.stringify(object);

      let url = "http://127.0.0.1:8000/user/";

      if (isLogin) {
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

      const resData = await response.json();
      console.log(resData);
      if (isLogin) {
        if (resData.status === "GA" || resData.status === "Email") {
          setOtp(true);
        } else {
          let jwt_token = resData.status;
          console.log(jwt_token);
          return navigate("/");
        }
      } else {
        return navigate("/auth?mode=login");
      }
    } else {
      const data = new FormData(event.target);
      object = {};
      data.forEach((value, key) => (object[key] = value));

      let body = JSON.stringify(object);

      console.log(body);
      let url = "http://127.0.0.1:8000/user/check_otp/";
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
        return navigate("/");
      } else {
        return response;
      }
    }
  }

  return (
    <>
      <Form method="post" className={classes.form} onSubmit={submitHandler}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.status && <p>{data.status}</p>}
        {!isLogin && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" required />
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {otp && (
          <p>
            <label htmlFor="otp">Otp</label>
            <input id="otp" type="otp" name="otp" required />
          </p>
        )}
        {!isLogin && (
          <p>
            <label htmlFor="OTP">OTP</label>
            <select id="otp_enabled" name="otp_enabled">
              <option value="">None</option>
              <option value="GA">Google Authenticator</option>
              <option value="Email">Email</option>
            </select>
          </p>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create account" : "Sign in"}
          </Link>
          <button>{isSubmitting ? "submitting..." : "Submit"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
