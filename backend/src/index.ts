import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
