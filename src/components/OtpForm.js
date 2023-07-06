import { Form, useActionData, useNavigation } from "react-router-dom";

import classes from "./AuthForm.module.css";

function OtpForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>Enter OTP</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.status && <p>{data.status}</p>}
        <p>
          <label htmlFor="otp">OTP</label>
          <input id="otp" type="text" name="otp" required />
        </p>

        <div className={classes.actions}>
          <button>{isSubmitting ? "submitting..." : "Submit"}</button>
        </div>
      </Form>
    </>
  );
}

export default OtpForm;
