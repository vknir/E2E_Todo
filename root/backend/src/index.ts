import express, { json } from "express";
import "dotenv/config";
import v1Router from "./routes/v1";
import cors from 'cors'


const port = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(json());

app.use("/api/v1",v1Router);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
