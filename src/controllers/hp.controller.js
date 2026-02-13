import { fetchCompensationData } from "../services/hp.services.js";

export const getPrograms = async (req, res) => {
  console.log(req.query)
  try {
    const data = await fetchCompensationData(req,res);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch programs" , error });
  }
};
