import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, urlencoded } from "express";
import cors from "cors";
import emailer from "./components/emailer/emailer.component";

const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.use(cors());

app.use(
  cors({
    origin: true,
  })
);

app.use(
  urlencoded({
    extended: true,
  })
);

// Validate API Key
app.use((req: any, res: any, next: NextFunction) => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("API_KEY does not exist in environment variables");
  }
  const authHeader = req.headers.authorization;
  const auth = authHeader && authHeader.split(" ")[1];
  if (auth && auth === API_KEY) {
    next();
  } else {
    return res.status(401).send({
      err: "Invalid or missing API key",
    });
  }
});

app.use(bodyParser.json());

// Register routes
emailer(router);
app.use("/hooks", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});
