import { fetchCompensationData } from "../services/hp.services.js";

export const getPrograms = async (req, res) => {
  console.log(req.query)
  try {
    const data = await fetchCompensationData(req,res);

    if(!data) throw new Error("parnet ka error hai ")
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch programs" , error });
  }
};
