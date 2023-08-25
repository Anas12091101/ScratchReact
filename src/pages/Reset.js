import { toast } from "react-toastify";
import ResetForm from "../components/ResetForm";
import { convertFormDataToJSONString, fetch_url } from "../services";
import { redirect } from "react-router-dom";

function ResetPage() {
  return <ResetForm />;
}

export default ResetPage;

export async function action({ request }) {
  const params = new URL(window.location).searchParams;
  console.log(params);
  console.log(params.get("confirm"));
  if (params.get("confirm") === "true") {
    let token = params.get("token");
    let formData = await request.formData();
    let isSame = formData.get("password") === formData.get("confirm_password");
    if (!isSame) {
      toast.error("Both passwords should be same");
      return redirect(`/reset?confirm=true&token=${token}`);
    } else {
      formData.append("token", token);
      let body = convertFormDataToJSONString(formData);
      let url =
        process.env.REACT_APP_BACKEND_URL + "user/api/password_reset/confirm/";
      let [ok, output] = await fetch_url(url, body, "POST");
      if (!ok) {
        output["password"]?.map((error) => toast.error(error));
        return redirect(`/reset?confirm=true&token=${token}`);
      } else {
        toast.success(`Your password has been resetted`);
        return redirect("/auth?mode=login");
      }
    }
  } else {
    let formData = await request.formData();
    let body = convertFormDataToJSONString(formData);
    let url = process.env.REACT_APP_BACKEND_URL + "user/api/password_reset/";
    let [ok, output] = await fetch_url(url, body, "POST");
    if (!ok) {
      toast.error("Something bad happened");
      return redirect("/reset");
    } else {
      toast.success(
        `A password reset email has been sent to ${formData.get("email")}`
      );
      return redirect("/auth?mode=login");
    }
  }
}
