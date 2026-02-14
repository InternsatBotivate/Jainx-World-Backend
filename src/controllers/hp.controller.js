import { fetchCompensationData } from "../services/hp.services.js";

export const getPrograms = async (req, res) => {
  console.log("Inside get program");
  try {
    const data = await fetchCompensationData(req.query);
    console.log("Inside get program and got response");
    res.json(data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch programs" });
  }
};
