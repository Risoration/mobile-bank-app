import { Schema, Document, model } from 'mongoose';
import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accountId: { type: String, required: true },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: [String] },
    pending: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('Transaction', transactionSchema);

export default TransactionModel;
