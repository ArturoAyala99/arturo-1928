import { SnailPayStatus, SnailPayStatusDetail, SnailPayRequest, SnailPayResponse  } from '../types/snailpay.types';

// datos correctos
const APPROVED_CARD = "1234123412341234";
const APPROVED_EXPIRY = "12/26";
const APPROVED_CVV = "543";

// construir response de SnailPay
const buildResponse = (request: SnailPayRequest, status: SnailPayStatus, detail: SnailPayStatusDetail, authorizationCode: string | null): SnailPayResponse => {
    const id = `snailpay_${crypto.randomUUID()}`;
    const reference = `REF-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    return {
        id: id,
        status: status,
        status_detail: detail,
        transaction_amount: request.amount,
        date_created: new Date().toISOString(),
        authorization_code: authorizationCode,
        reference: reference,
        payer_id: request.payer_id,
        payer_email: request.payer_email,
        card_number: request.card_number,
        cvv: request.cvv
    }
}

// para forzar un error interno
export type ChargeOptions ={
    forceSystemError?: boolean;
}

// servicio de pago
export const Payment = (request: SnailPayRequest, options: ChargeOptions = {}): SnailPayResponse => {

    // validar si es error interno o no (solo si se fuerza)
    if (options.forceSystemError) return buildResponse(request, "error", "internal_server_error", null);

    // validar el monto
    if (typeof request.amount !== "number" || !Number.isFinite(request.amount) || request.amount <= 0) {
        return buildResponse(request, "rejected", "invalid_amount", null);
    }

    // validar número de tarjeta
    if (request.card_number !== APPROVED_CARD) return buildResponse(request, "rejected", "card_declined", null);

    // validar cvv
    if (request.cvv !== APPROVED_CVV) return buildResponse(request, "rejected", "invalid_cvv", null);

    // validar fecha de expiración
    if (request.expiry !== APPROVED_EXPIRY) return buildResponse(request, "rejected", "invalid_expiry", null);

    // si pasa todo, generamos auth y mandamos response
    const auth_code = `AUTH-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;

    return buildResponse(request, "approved", "payment_approved", auth_code);
}