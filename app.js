import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import hpRoutes from "./src/routes/hp.routes.js"
dotenv.config();
const PORT= process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hp", hpRoutes);

app.get("/",(req, res)=>{
  return res.send("done ")
})


app.listen(5000, () => {
  console.log("Server running on http://localhost:"+PORT);
});
