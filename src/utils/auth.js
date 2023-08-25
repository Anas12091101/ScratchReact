import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  let token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}

export function setJWTToken(token) {
  localStorage.setItem("token", token);
  let parsedToken = JSON.parse(atob(token.split(".")[1]));
  let expires = new Date(parsedToken.exp * 1000);
  localStorage.setItem("expiration", expires.toISOString());
}
