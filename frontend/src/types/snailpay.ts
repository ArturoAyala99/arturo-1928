export type SnailPayStatus = "approved" | "rejected" | "error";

export type SnailPayStatusDetail = "payment_approved" | "invalid_amount" | "invalid_cvv" | "invalid_expiry" | "card_declined" | "internal_server_error";

export type SnailPayRequest = {
    card_number: string;
    expiry: string;
    cvv: string;
    full_name: string;
    amount: number;
    payer_id: string;
    payer_email: string;
};

export type SnailPayResponse = {
    id: string;
    status: SnailPayStatus;
    status_detail: SnailPayStatusDetail;
    transaction_amount: number;
    date_created: string;
    authorization_code: string | null;
    reference: string;
    payer_id: string;
    payer_email: string;
    card_number: string;
    cvv: string;
};

// guardar información del último pago
export type LastPayment = {
    card_number: string;
    cvv: string;
    amount: number;
    date: string;
};

// para cachar errores que devuelve la API cuando faltan campos
export type MissingFieldsError = {
    error: "missing_fields";
    missing_fields: string[];
}