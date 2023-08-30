import { toast } from "react-toastify";
import ResetForm from "../components/ResetForm";
import { convertFormDataToJSON } from "../services";
import { redirect } from "react-router-dom";
import axiosInstance from "../interceptor";

function ResetPage() {
  return <ResetForm />;
}

export default ResetPage;

export async function action({ request }) {
  const params = new URL(window.location).searchParams;
  let formData = await request.formData();

  if (params.get("confirm") === "true") {
    let token = params.get("token");
    let isSame = formData.get("password") === formData.get("confirm_password");
    if (!isSame) {
      toast.error("Both passwords should be same");
      return null;
    } else {
      formData.append("token", token);
      let body = convertFormDataToJSON(formData);
      let url = "user/api/password_reset/confirm/";
      try {
        await axiosInstance.post(url, body);
        toast.success(`Your password has been resetted`);
        return redirect("/auth?mode=login");
      } catch (error) {
        return null;
      }
    }
  } else {
    let body = convertFormDataToJSON(formData);
    let url = "user/api/password_reset/";
    // let [ok, output] = await fetch_url(url, body, "POST");
    try {
      await axiosInstance.post(url, body);
      toast.success(
        `A password reset email has been sent to ${formData.get("email")}`
      );
      return redirect("/auth?mode=login");
    } catch (error) {
      return null;
    }
  }
}
