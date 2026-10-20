import express, { type Request, type Response } from "express";
import cors from "cors";
import { snailPayRouter } from "./routes/snailpay.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/snailpay", snailPayRouter);

export default app;