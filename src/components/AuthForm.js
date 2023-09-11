import { Form, Link, useSearchParams, useNavigate } from "react-router-dom";

import classes from "./Form.module.css";
import { useState } from "react";
import { convertFormDataToJSON } from "../services";
import { toast } from "react-toastify";
import { setJWTToken } from "../utils/auth";
import axiosInstance from "../interceptor";

function AuthForm() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const next = searchParams.get("next") ? "/" + searchParams.get("next") : "/";
  const [otp, setOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    setSubmitting(true);

    const data = new FormData(event.target);
    let body = convertFormDataToJSON(data);

    if (!otp) {
      let authUrl = isLogin ? "user/login/" : "user/register_user/";
      // const [ok, output] = await fetch_url(authUrl, body, "POST");
      try {
        const { data } = await axiosInstance.post(authUrl, body);

        if (isLogin) {
          if (data.type === "GA" || data.type === "email") {
            setOtp(true);
          } else {
            let jwt_token = data.token.access;
            setJWTToken(jwt_token);
            toast.success("Successfully Logged In");
            return navigate(next);
          }
        } else {
          if (!data["message"]["email"]) {
            let otpUrl = "otp/create_otp/";
            try {
              await axiosInstance.post(otpUrl, body);
              toast.success("Successfully Registered User");
              setSubmitting(false);
              return navigate("/auth?mode=login");
            } catch (error) {}
          }
        }
      } catch (error) {}

      setSubmitting(false);
    } else {
      let url = `otp/check_otp/`;
      try {
        let { data } = await axiosInstance.post(url, body);
        setSubmitting(false);
        let jwt_token = data.token.access;
        setJWTToken(jwt_token);
        toast.success("Successfully Logged In");
        return navigate(next);
      } catch (error) {}
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
          <Link to={`/reset`}>Reset Password</Link>
          <div>
            <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? "Create account" : "Sign in"}
            </Link>
            <button>{submitting ? "submitting..." : "Submit"}</button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
