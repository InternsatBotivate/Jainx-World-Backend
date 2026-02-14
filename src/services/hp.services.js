import axios from "axios";
import { getToken, setToken } from "../utils/tokenManager.js";

export const fetchHpToken = async () => {
  console.log("inside fetch HP token")
  const existingToken = getToken();
  if (existingToken)  {
    console.log("Inside Token exists")
    return existingToken;
  };

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
  console.log("inside fetch hp token token got and setup", access_token);

  return access_token;
};

export const fetchCompensationData = async (params) => {
  params = {partnerid: process.env.HP_PARTNERID, quarter: process.env.HP_QUARTER}
  console.log("Inside fetch composition data");
  const token = await fetchHpToken();

  const response = await axios.get(process.env.HP_PROGRAM_URL, {
    params,
    headers: {
      token,
      "x-api-key": process.env.HP_API_KEY,
    },
  });
  console.log("Inside fetch composition data and got response data")
  return response.data;
};
