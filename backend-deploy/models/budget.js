import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

const budgetSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

const BudgetModel = mongoose.model('Budget', budgetSchema);

export default BudgetModel;
