import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const submit = useSubmit();
  function submitHandler(event) {
    // const email = event.target.email.value;
    const password = event.target.password.value;
    localStorage.setItem("password", password);
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
