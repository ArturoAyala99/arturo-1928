import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Payment } from "../api/snailpay";
import { addToBalance } from "../services/balanceService";
import { ApiError } from "../api/client";
import type { SnailPayResponse } from "../types/snailpay";
import { saveLastPayment } from "../services/balanceService";

type SnailPayModalProps = {
    onClose: () => void;
    onSuccess: (newBalance: number) => void;
};

export const SnailPayModal = ({onClose, onSuccess}: SnailPayModalProps) => {
    const { user } = useAuth();
    
    // campos del formulario
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [fullName, setFullName] = useState(user?.fullName ?? "");
    const [amount, setAmount] = useState("");
    const [simulateError, setSimulateError] = useState(false);

    // configuraciones del modal
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<SnailPayResponse | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        // evitar cerrar el modal mientras se está enviando el formulario
        if (isSubmitting) return;
        
        setIsClosing(true);
        setTimeout(onClose, 150);
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        // validar campos
        const amountValue = Number(amount);
        if (amountValue <= 0) return setError("El monto debe ser mayor a 0");
        if (!cardNumber.trim()) return setError("El número de tarjeta es obligatorio");
        if (cardNumber.trim().length < 16) return setError("El número de tarjeta debe tener 16 dígitos");
        if (!expiry.trim()) return setError("La fecha de vencimiento es obligatoria");
        if (!cvv.trim()) return setError("El CVV es obligatorio");
        if (!fullName.trim()) return setError("El nombre es obligatorio");
        if (!user) return setError("No hay sesión activa");

        setIsSubmitting(true);

        try {
            // llamar a la api
            const response = await Payment(
                {
                    card_number: cardNumber.trim(),
                    expiry: expiry.trim(),
                    cvv: cvv.trim(),
                    full_name: fullName.trim(),
                    amount: amountValue,
                    payer_id: user.id,
                    payer_email: user.email,
                },
                simulateError
            );

            setResult(response);

            if (response.status === "approved"){
                const newBalance = addToBalance(user.id, response.transaction_amount);

                saveLastPayment({
                    card_number: response.card_number,
                    cvv: response.cvv,
                    amount: response.transaction_amount,
                    date: response.date_created,
                });

                onSuccess(newBalance);
            } else if (response.status === "rejected") {
                setError(response.status_detail);
            } else {
                setError("SnailPay no está disponible. Intenta de nuevo.");
            }

        } catch (error) {
            setError(error instanceof ApiError ? error.message : "Error inesperado");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? "animate-modal-out" : "animate-modal-in"}`} role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/50"/>

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                {result?.status === "approved" ? 
                (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="text-red-400 hover:text-red-600 disabled:opacity-50 text-xl leading-none cursor-pointer"
                                aria-label="Cerrar"
                            >
                                ×
                            </button>
                        </div>
                        <p className="bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded">
                            Se cargaron: {result.transaction_amount.toFixed(2)} correctamente.
                            Referencia: {result.reference}.
                        </p>
                    </>
                ) : 
                (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-800">Cargar saldo</h2>
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="text-red-400 hover:text-red-600 disabled:opacity-50 text-xl leading-none cursor-pointer"
                                aria-label="Cerrar"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Monto</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    disabled={isSubmitting}
                                    placeholder="100"
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-sky-500 disabled:bg-slate-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Número de tarjeta</label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    disabled={isSubmitting}
                                    placeholder="1234 1234 1234 1234"
                                    maxLength={16}
                                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-sky-500 disabled:bg-slate-100"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Vencimiento</label>
                                    <input
                                        type="text"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        disabled={isSubmitting}
                                        placeholder="MM/YY"
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-sky-500 disabled:bg-slate-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                                    <input
                                        type="text"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        disabled={isSubmitting}
                                        placeholder="543"
                                        maxLength={3}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-sky-500 disabled:bg-slate-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-sky-500 disabled:bg-slate-100"
                                />
                            </div>

                            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={simulateError}
                                    onChange={(e) => setSimulateError(e.target.checked)}
                                    disabled={isSubmitting}
                                />
                                Simular error del sistema (para pruebas)
                            </label>

                            {error && (
                                <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">
                                    {error}
                                </p>
                            )}

                            <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors">
                                {isSubmitting ? "Procesando..." : "Cargar saldo"}
                            </button>
                        </form>
                    </>
                )}
                
            </div> 
        </div>
    );
    
}