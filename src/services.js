export async function fetch_url(url, body, method, login_required = false) {
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
