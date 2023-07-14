import { Form, Link, useSearchParams } from "react-router-dom";
import classes from "./Form.module.css";
import { useNavigation } from "react-router-dom";

function ResetForm() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const isConfirm = searchParams.get("confirm") === "true";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={classes.form}>
      <h1>Reset Password</h1>
      {!isConfirm && (
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
      )}
      {isConfirm && (
        <p>
          <label htmlFor="password">Psssword</label>
          <input id="password" type="password" name="password" required />
        </p>
      )}
      {isConfirm && (
        <p>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            required
          />
        </p>
      )}
      <div className={classes.actions} style={{ justifyContent: "flex-end" }}>
        <Link to={"/auth?mode=login"}>Back</Link>
        <button>{isSubmitting ? "submitting..." : "Submit"}</button>
      </div>
    </Form>
  );
}

export default ResetForm;
