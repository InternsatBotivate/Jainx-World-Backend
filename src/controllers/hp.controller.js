import { fetchCompensationData } from "../services/hp.services.js";

export const getPrograms = async (req, res) => {
  try {
    const data = await fetchCompensationData(req.query);
    res.json(data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch programs" });
  }
};
