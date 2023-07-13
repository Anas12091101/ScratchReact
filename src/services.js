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
    return [response.ok, data];
  } catch (err) {
    console.log(err);
    return [false, err];
  }
}
