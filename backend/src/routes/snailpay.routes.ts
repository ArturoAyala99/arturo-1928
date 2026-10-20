import { Router } from "express";
import { PaymentController } from "../controllers/snailpay.controller";

export const snailPayRouter = Router();

snailPayRouter.post("/payment", PaymentController);