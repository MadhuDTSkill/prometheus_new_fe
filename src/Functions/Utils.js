import { jwtDecode } from "jwt-decode";

export function checkAuthentication() {
  const storedAccessToken = localStorage.getItem("accessToken");
  if (storedAccessToken) {
    const decodedToken = jwtDecode(storedAccessToken);
    const currentTime = Math.trunc(Date.now() / 1000);
    return !(currentTime > decodedToken.exp);
  } else {
    return false;
  }
}
