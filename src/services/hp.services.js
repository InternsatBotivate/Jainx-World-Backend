import axios from "axios";
import { getToken, setToken } from "../utils/tokenManager.js";




export const fetchHpToken = async () => {
  const existingToken = getToken();
  if (existingToken) return existingToken;
  
  const response = await axios.post(
    process.env.HP_TOKEN_URL,
    new URLSearchParams(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.HP_USERNAME,
        password: process.env.HP_PASSWORD,
      },
    }
  );

  const { access_token, expires_in } = response.data;
  
  setToken(access_token, expires_in);

  return access_token;
};

export const fetchCompensationData = async (params) => {
  const token = await fetchHpToken();

  const response = await axios.get(process.env.HP_PROGRAM_URL, {
    params,
    headers: {
      token,
      "x-api-key": process.env.HP_API_KEY,
    },
  });

  return response.data;
};
