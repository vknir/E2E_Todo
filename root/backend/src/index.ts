import express, { json } from "express";
import "dotenv/config";
import v1Router from "./routes/v1";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();
const domainsAllowed = [
  "https://make-a-list-lac.vercel.app",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: domainsAllowed, // Replace with your actual Vercel URL
  })
);
app.use(json());

app.use("/api/v1", v1Router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
