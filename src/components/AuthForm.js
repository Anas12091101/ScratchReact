import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./AuthForm.module.css";
import { useState } from "react";
import { setJWTToken } from "../utils/auth";

function AuthForm() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [otp, setOtp] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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

      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.status, { duration: 5000 });
        return;
      }

      if (isLogin) {
        if (resData.status === "GA" || resData.status === "Email") {
          setOtp(true);
        } else {
          let jwt_token = resData.status.access;
          setJWTToken(jwt_token);
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

      let url = "http://127.0.0.1:8000/user/check_otp/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const resData = await response.json();
      if (response.ok) {
        let jwt_token = resData["status"]["access"];
        setJWTToken(jwt_token);
        return navigate("/");
      } else {
        toast.error(resData.status, { duration: 5000 });
        return;
      }
    }
  }
  return (
    <>
      <Form method="post" className={classes.form} onSubmit={submitHandler}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {!isLogin && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" required />
          </p>
        )}
        <p>
          {!otp && <label htmlFor="email">Email</label>}
          <input
            id="email"
            type={otp ? "hidden" : "email"}
            name="email"
            required
          />
        </p>
        <p>
          {!otp && <label htmlFor="password">Password</label>}
          <input
            id="password"
            type={otp ? "hidden" : "password"}
            name="password"
            required
          />
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
