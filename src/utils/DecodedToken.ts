import { jwtDecode } from "jwt-decode";

const decodedToken = (token: string) => {
  const decoded = jwtDecode<{ email: string; id: string }>(token);
  if (decoded && decoded.email && decoded.id) {
    return { email: decoded.email, id: decoded.id };
  }
};

export default decodedToken;
