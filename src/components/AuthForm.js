import { Form, Link, useSearchParams, useNavigate } from "react-router-dom";

import classes from "./Form.module.css";
import { useState } from "react";
import { convertFormDataToJSONString, fetch_url } from "../services";
import { toast } from "react-toastify";
import { setJWTToken } from "../utils/auth";

function AuthForm() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [otp, setOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    setSubmitting(true);

    const data = new FormData(event.target);
    let body = convertFormDataToJSONString(data);
    let baseUrl = process.env.REACT_APP_BACKEND_URL;

    if (!otp) {
      let authUrl = baseUrl + (isLogin ? "user/login/" : "user/register_user/");
      const [ok, output] = await fetch_url(authUrl, body, "POST");
      setSubmitting(false);

      if (ok) {
        if (isLogin) {
          if (output.type === "GA" || output.type === "email") {
            setOtp(true);
          } else {
            let jwt_token = output.token.access;
            setJWTToken(jwt_token);
            toast.success("Successfully Logged In");
            return navigate("/");
          }
        } else {
          let otpUrl = baseUrl + "otp/create_otp/";
          const [ok, output] = await fetch_url(otpUrl, body, "POST");
          if (ok) {
            toast.success("Successfully Registered User");
            setSubmitting(false);
            return navigate("/auth?mode=login");
          } else {
            return toast.error(
              output.message ? output.message : "Something bad happened"
            );
          }
        }
      } else {
        return toast.error(
          output.message ? output.message : "Something bad happened"
        );
      }
    } else {
      let url = `${baseUrl}otp/check_otp/`;

      let [ok, output] = await fetch_url(url, body, "POST");
      setSubmitting(false);

      if (ok) {
        let jwt_token = output.token.access;
        setJWTToken(jwt_token);
        toast.success("Successfully Logged In");
        return navigate("/");
      }
      return toast.error(
        output.message ? output.message : "Something bad happened"
      );
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
