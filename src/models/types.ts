export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currency: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories?: string[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  subcategory?: string;
  description: string;
  date: string;
  paymentMethod: string;
  notes?: string;
}

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
  startDate: string;
  endDate?: string;
  category: string;
  nextPaymentDate: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  icon?: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  category: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'tip' | 'info' | 'anomaly';
  title: string;
  description: string;
  date: string;
  actionable?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface FinancialHealth {
  score: number;
  savingsRate: number;
  subscriptionBurden: number;
  expenseGrowth: number;
  incomeStability: number;
}
