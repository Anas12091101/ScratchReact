import { Form, Link, useSearchParams, useNavigate } from "react-router-dom";

import classes from "./AuthForm.module.css";
import { useState } from "react";
import { fetchUrl, getBody } from "../services";
import { toast } from "react-toastify";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [otp, setOtp] = useState(false);
  const [submitting, setSubmitiing] = useState(false);
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();

    setSubmitiing(true);

    let body = getBody(event.target);

    if (!otp) {
      let url = process.env.REACT_APP_BACKEND_URL;
      url += isLogin ? "user/login/" : "user/register_user/";

      const [responseOk, responseOutput] = await fetchUrl(url, body, "POST");
      if (responseOk) {
        if (isLogin) {
          if (
            responseOutput.message === "GA" ||
            responseOutput.message === "Email"
          ) {
            setOtp(true);
            setSubmitiing(false);
          } else {
            let jwt_token = responseOutput.token.access;
            localStorage.setItem("token", jwt_token);
            toast.success("Successfully Logged In");
            return navigate("/");
          }
        } else {
          setSubmitiing(false);
          toast.success("Successfully Logged In");
          return navigate("/auth?mode=login");
        }
      }
    } else {
      let url = `${process.env.REACT_APP_BACKEND_URL}/otp/check/`;

      let [responseOk, responseOutput] = await fetchUrl(url, body, "POST");

      if (responseOk) {
        let jwt_token = responseOutput.token.access;
        localStorage.setItem("token", jwt_token);
        toast.success("Successfully Logged In");
        return navigate("/");
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
          <button>{submitting ? "submitting..." : "Submit"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
