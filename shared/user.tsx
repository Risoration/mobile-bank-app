import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  varchar,
  decimal,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const subscriptionTierEnum = pgEnum('subscription_tier', [
  'free',
  'premium',
]);
export const transactionTypeEnum = pgEnum('transaction_type', [
  'credit',
  'debit',
]);
export const transactionCategoryEnum = pgEnum('transaction_category', [
  'income',
  'shopping',
  'gas',
  'groceries',
  'dining',
  'utilities',
  'entertainment',
  'healthcare',
  'travel',
  'other',
]);

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  subscriptionTier: subscriptionTierEnum('subscription_tier')
    .notNull()
    .default('free'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  bankName: text('bank_name').notNull(),
  accountNumber: text('account_number').notNull(),
  balance: decimal('balance', { precision: 15, scale: 2 })
    .notNull()
    .default('0.00'),
  accountType: text('account_type').notNull().default('checking'),
  isActive: boolean('is_active').notNull().default(true),
  trueLayerAccountId: text('truelayer_account_id'),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const transactions = pgTable('transactions', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  accountId: varchar('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  type: transactionTypeEnum('type').notNull(),
  category: transactionCategoryEnum('category').notNull().default('other'),
  transactionDate: timestamp('transaction_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupSchema = loginSchema.extend({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Account = typeof accounts.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;

export interface AccountWithTransactions extends Account {
  transactions: Transaction[];
}

export interface DashboardData {
  user: User;
  accounts: AccountWithTransactions[];
  totalBalance: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  recentTransactions: Transaction[];
}
