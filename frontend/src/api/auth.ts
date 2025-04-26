import api from "@/utils/config";

export const signup = (data: { email: string; password: string; name: string; country: string; }) => {
  return api.post('/signup', data);
};

export const login = (data: { email: string; password: string; }) => {
  return api.post('/login', data);
};
