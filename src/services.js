import { toast } from "react-toastify";

export async function fetchUrl(url, body, method, login_required = false) {
  let headers = { "Content-Type": "application/json" };
  if (login_required) {
    headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  try {
    const response = await fetch(url, {
      headers: headers,
      method: method,
      body: body,
    });
    const data = await response.json();
    if (!response.ok) {
      throw data.message ? data.message : "An error occured";
    }
    return [response.ok, data];
  } catch (err) {
    toast.error(err);
    return [false, err];
  }
}

export function getBody(formData) {
  const data = new FormData(formData);
  var object = {};
  data.forEach((value, key) => (object[key] = value));
  var body = JSON.stringify(object);
  return body;
}
