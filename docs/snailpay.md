# Guía para reproducir las respuestas del servicio

Esta guía describe el contrato del endpoint y cómo reproducir cada uno de los escenarios implementados.

## Endpoint
POST http://localhost:3000/api/snailpay/payment

Content-Type: application/json

## Request

| Campo | Tipo | Descripción |
|---|---|---|
| `card_number` | string | Número de tarjeta (16 dígitos) |
| `expiry` | string | Fecha de vencimiento en formato `MM/YY` |
| `cvv` | string | Código de seguridad (3 dígitos) |
| `full_name` | string | Nombre del titular |
| `amount` | number | Monto a cargar (debe ser mayor a 0) |
| `payer_id` | string | Identificador del usuario registrado |
| `payer_email` | string | Correo del usuario registrado |

## Ejemplo

```json
{
  "card_number": "1234123412341234",
  "expiry": "12/26",
  "cvv": "543",
  "full_name": "Juan",
  "amount": 100,
  "payer_id": "user-123",
  "payer_email": "juan@test.com"
}
```
### Cobro exitoso
```bash
curl -X POST http://localhost:3000/api/snailpay/payment \
  -H "Content-Type: application/json" \
  -d '{
    "card_number": "1234123412341234",
    "expiry": "12/26",
    "cvv": "543",
    "full_name": "Juan",
    "amount": 100,
    "payer_id": "user-123",
    "payer_email": "juan@test.com"
  }'
```
Respuesta esperada: status: "approved", status_detail: "payment_approved", authorization_code presente, HTTP 200.

### CVV inválido
```bash
curl -X POST http://localhost:3000/api/snailpay/payment \
  -H "Content-Type: application/json" \
  -d '{
    "card_number": "1234123412341234",
    "expiry": "12/26",
    "cvv": "999",
    "full_name": "Juan",
    "amount": 100,
    "payer_id": "user-123",
    "payer_email": "juan@test.com"
  }'
```
Respuesta esperada: status: "rejected", status_detail: "invalid_cvv", authorization_code: null, HTTP 200.

### Vencimiento inválido
```bash
curl -X POST http://localhost:3000/api/snailpay/payment \
  -H "Content-Type: application/json" \
  -d '{
    "card_number": "1234123412341234",
    "expiry": "01/30",
    "cvv": "543",
    "full_name": "Juan",
    "amount": 100,
    "payer_id": "user-123",
    "payer_email": "juan@test.com"
  }'
```
Respuesta esperada: status: "rejected", status_detail: "invalid_expiry", HTTP 200.

### Tarjeta rechazada
```bash
curl -X POST http://localhost:3000/api/snailpay/payment \
  -H "Content-Type: application/json" \
  -d '{
    "card_number": "4000000000000002",
    "expiry": "12/26",
    "cvv": "543",
    "full_name": "Juan",
    "amount": 100,
    "payer_id": "user-123",
    "payer_email": "juan@test.com"
  }'
```
Respuesta esperada: status: "rejected", status_detail: "card_declined", HTTP 200.

### Monto inválido
```bash
curl -X POST http://localhost:3000/api/snailpay/payment \
  -H "Content-Type: application/json" \
  -d '{
    "card_number": "1234123412341234",
    "expiry": "12/26",
    "cvv": "543",
    "full_name": "Juan",
    "amount": 0,
    "payer_id": "user-123",
    "payer_email": "juan@test.com"
  }'
```
Respuesta esperada: status: "rejected", status_detail: "invalid_amount", HTTP 200.

### Campos faltantes
```bash
curl -X POST http://localhost:3000/api/snailpay/payment \
  -H "Content-Type: application/json" \
  -d '{
    "card_number": "1234123412341234",
    "expiry": "12/26",
    "full_name": "Juan",
    "amount": 100,
    "payer_id": "user-123",
    "payer_email": "juan@test.com"
  }'
```
Respuesta esperada: HTTP 400 con:
```json
{ "error": "missing_fields", "missing_fields": ["cvv"] }.
```

### Error del sistema
```bash
curl -X POST http://localhost:3000/api/snailpay/payment \
  -H "Content-Type: application/json" \
  -H "X-SnailPay-Simulate: system_error" \
  -d '{
    "card_number": "1234123412341234",
    "expiry": "12/26",
    "cvv": "543",
    "full_name": "Juan",
    "amount": 100,
    "payer_id": "user-123",
    "payer_email": "juan@test.com"
  }'
```
Respuesta esperada: HTTP 500 con status: "error", status_detail: "internal_server_error". El saldo no se modifica.