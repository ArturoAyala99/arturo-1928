import type { Request, Response } from "express";
import { Payment } from "../services/snailpay.service";
import type { SnailPayRequest } from "../types/snailpay.types";

export const PaymentController = (req: Request, response: Response) => {
    // campos obligatorios
    const required_fields = [
        "card_number",
        "expiry",
        "cvv",
        "full_name",
        "amount",
        "payer_id",
        "payer_email",
    ];

    // cachar algún campo obligatorio que no tenga valores válidos
    const missing_field = required_fields.filter( (item) =>
        req.body[item] === undefined || req.body[item] === null || req.body[item] === ""
    );

    // si hay campos faltantes, retornar error 400
    if (missing_field.length > 0) {
        return response.status(400).json({error:"Missing fields", missing_fields: missing_field});
    }


    // construir request de SnailPay a partir del body de la petición
    const request: SnailPayRequest = {
        card_number: String(req.body.card_number),
        expiry: String(req.body.expiry),
        cvv: String(req.body.cvv),
        full_name: String(req.body.full_name),
        amount: Number(req.body.amount),
        payer_id: String(req.body.payer_id),
        payer_email: String(req.body.payer_email)
    }

    // ¿se forzó error interno?
    const forceSystemError = req.header("X-SnailPay-Simulate") === "system_error";

    // llamar al servicio de SnailPay con el request construido
    const result = Payment(request, { forceSystemError });

    let http_status = 200;

    if (result.status === "error") http_status = 500;

    return response.status(http_status).json(result);
}