export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  return true;
};
