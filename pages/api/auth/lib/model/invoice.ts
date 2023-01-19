import mongoose from "mongoose";
import { stripVTControlCharacters } from "util";
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        email: {
            type: String,
            required: true,
            unique: false
        },
        payerEmail: {
            type: String,
            required: true,
            unique: false
        },
        walletAddress: {
            type: String,
            required: true,
            unique: false
        },
        preferredCrypto: {
            type: String,
            required: true,
            unique: false
        },
        category: {
            type: String,
            required: false,
            unique: false
        },
        amount: {
            type: Number,
            required: true,
            unique: false
        }
    }
)

const invoice = mongoose.models.invoices || mongoose.model("invoices", invoiceSchema);
export default invoice;