export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  // Optionally, you can decode the token and check its validity
  // const decodedToken = jwt_decode(token);
  // return decodedToken.exp > Date.now() / 1000;

  return true; // Simplified for example
};
