import axios from "axios";
import { getToken, setToken } from "../utils/tokenManager.js";

export const fetchHpToken = async (req,res) => {
  const existingToken = getToken();
  if (existingToken) throw new Error("exisitng token is wrong ") ;
  
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

  if(!access_token || !expires_in ) throw new Error("accesstoken and refersh token nhi hai ")

  console.log(access_token,"access token ")

  console.log(expires_in,"dfkfkfkfjkj")

  setToken(access_token, expires_in);

  return access_token;
};

export const fetchCompensationData = async (req,res) => {
  const token = await fetchHpToken(req,res);


  const isEnv = process.env.HP_PROGRAM_URL || "https://partner.api.hp.com/partner-data/compensation/v1/program"

  


  

  if(!isEnv) throw new Error("env not found ")

  const response = await axios.get(process.env.HP_PROGRAM_URL, {
    params,
    headers: {
      token,
      "x-api-key": process.env.HP_API_KEY,
    },
  });

  console.log(response,"responce credential ")

  if(!response) throw new Error("token nhi mil paya ")
  return response.data;
};



