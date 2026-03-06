import { Transaction, Category, RecurringBill, Subscription, AIInsight, FinancialHealth, ChatMessage } from '@/models/types';

export const categories: Category[] = [
  { id: '1', name: 'Food', icon: 'UtensilsCrossed', color: 'hsl(25, 95%, 55%)', subcategories: ['Groceries', 'Restaurants', 'Coffee', 'Fast Food'] },
  { id: '2', name: 'Travel', icon: 'Plane', color: 'hsl(200, 70%, 50%)', subcategories: ['Flights', 'Hotels', 'Transport', 'Fuel'] },
  { id: '3', name: 'Shopping', icon: 'ShoppingBag', color: 'hsl(280, 60%, 55%)', subcategories: ['Clothing', 'Electronics', 'Home', 'Gifts'] },
  { id: '4', name: 'Utilities', icon: 'Zap', color: 'hsl(45, 90%, 50%)', subcategories: ['Electricity', 'Water', 'Gas', 'Internet'] },
  { id: '5', name: 'Health', icon: 'Heart', color: 'hsl(350, 70%, 55%)', subcategories: ['Doctor', 'Pharmacy', 'Gym', 'Insurance'] },
  { id: '6', name: 'Entertainment', icon: 'Gamepad2', color: 'hsl(160, 60%, 45%)', subcategories: ['Movies', 'Games', 'Events', 'Sports'] },
  { id: '7', name: 'Subscriptions', icon: 'RefreshCw', color: 'hsl(258, 65%, 58%)', subcategories: ['Streaming', 'Software', 'Membership'] },
  { id: '8', name: 'Salary', icon: 'Wallet', color: 'hsl(152, 60%, 42%)', subcategories: ['Main Job', 'Freelance', 'Bonus'] },
];

export const transactions: Transaction[] = [
  { id: '1', amount: 85000, type: 'income', category: 'Salary', description: 'Monthly Salary', date: '2026-03-01', paymentMethod: 'Bank Transfer' },
  { id: '2', amount: 2400, type: 'expense', category: 'Food', subcategory: 'Groceries', description: 'Weekly Groceries', date: '2026-03-05', paymentMethod: 'Credit Card' },
  { id: '3', amount: 1800, type: 'expense', category: 'Food', subcategory: 'Restaurants', description: 'Dinner at Italian Place', date: '2026-03-04', paymentMethod: 'Credit Card' },
  { id: '4', amount: 15000, type: 'expense', category: 'Utilities', subcategory: 'Electricity', description: 'Electricity Bill', date: '2026-03-03', paymentMethod: 'Auto-debit' },
  { id: '5', amount: 5600, type: 'expense', category: 'Food', subcategory: 'Coffee', description: 'Coffee shop visits', date: '2026-03-02', paymentMethod: 'UPI' },
  { id: '6', amount: 3200, type: 'expense', category: 'Entertainment', subcategory: 'Movies', description: 'Movie tickets', date: '2026-03-01', paymentMethod: 'Credit Card' },
  { id: '7', amount: 12000, type: 'expense', category: 'Shopping', subcategory: 'Electronics', description: 'Headphones', date: '2026-02-28', paymentMethod: 'Credit Card' },
  { id: '8', amount: 8500, type: 'expense', category: 'Health', subcategory: 'Gym', description: 'Gym membership', date: '2026-02-27', paymentMethod: 'Auto-debit' },
  { id: '9', amount: 2000, type: 'expense', category: 'Travel', subcategory: 'Fuel', description: 'Petrol', date: '2026-02-26', paymentMethod: 'UPI' },
  { id: '10', amount: 15000, type: 'income', category: 'Salary', subcategory: 'Freelance', description: 'Freelance project', date: '2026-02-25', paymentMethod: 'Bank Transfer' },
  { id: '11', amount: 4500, type: 'expense', category: 'Subscriptions', description: 'Various subscriptions', date: '2026-02-24', paymentMethod: 'Credit Card' },
  { id: '12', amount: 20000, type: 'expense', category: 'Utilities', subcategory: 'Internet', description: 'Annual internet plan', date: '2026-02-23', paymentMethod: 'Auto-debit' },
];

export const recurringBills: RecurringBill[] = [
  { id: '1', name: 'Rent', amount: 25000, frequency: 'monthly', startDate: '2025-01-01', category: 'Utilities', nextPaymentDate: '2026-04-01' },
  { id: '2', name: 'Electricity', amount: 3500, frequency: 'monthly', startDate: '2025-01-01', category: 'Utilities', nextPaymentDate: '2026-04-05' },
  { id: '3', name: 'Insurance', amount: 12000, frequency: 'quarterly', startDate: '2025-01-01', category: 'Health', nextPaymentDate: '2026-04-01' },
  { id: '4', name: 'Internet', amount: 1200, frequency: 'monthly', startDate: '2025-06-01', category: 'Utilities', nextPaymentDate: '2026-04-10' },
];

export const subscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', amount: 649, billingCycle: 'monthly', nextBillingDate: '2026-04-01', category: 'Entertainment' },
  { id: '2', name: 'Spotify', amount: 119, billingCycle: 'monthly', nextBillingDate: '2026-03-15', category: 'Entertainment' },
  { id: '3', name: 'Amazon Prime', amount: 1499, billingCycle: 'yearly', nextBillingDate: '2026-08-01', category: 'Shopping' },
  { id: '4', name: 'YouTube Premium', amount: 149, billingCycle: 'monthly', nextBillingDate: '2026-03-20', category: 'Entertainment' },
  { id: '5', name: 'iCloud Storage', amount: 75, billingCycle: 'monthly', nextBillingDate: '2026-03-18', category: 'Subscriptions' },
];

export const aiInsights: AIInsight[] = [
  { id: '1', type: 'anomaly', title: 'Food Spending Spike', description: 'Food expenses increased by 45% compared to last month. Consider cooking more at home.', date: '2026-03-05', actionable: true },
  { id: '2', type: 'tip', title: 'Coffee Savings', description: 'You spent ₹5,600 on coffee this month. Reducing by 30% can save ₹1,680 monthly.', date: '2026-03-04', actionable: true },
  { id: '3', type: 'info', title: 'Subscription Review', description: 'Your subscriptions cost ₹2,400/month. Consider reviewing unused services.', date: '2026-03-03' },
  { id: '4', type: 'info', title: 'Healthy Savings', description: 'Your savings rate is healthy at 32%. Keep it up!', date: '2026-03-02' },
  { id: '5', type: 'warning', title: 'Budget Alert', description: 'You\'ve spent 80% of your monthly shopping budget with 25 days remaining.', date: '2026-03-01', actionable: true },
];

export const financialHealth: FinancialHealth = {
  score: 82,
  savingsRate: 32,
  subscriptionBurden: 15,
  expenseGrowth: 8,
  incomeStability: 95,
};

export const monthlySpending = [
  { month: 'Oct', amount: 42000 },
  { month: 'Nov', amount: 38000 },
  { month: 'Dec', amount: 55000 },
  { month: 'Jan', amount: 41000 },
  { month: 'Feb', amount: 45000 },
  { month: 'Mar', amount: 32000 },
];

export const expenseBreakdown = [
  { name: 'Food', value: 9800, color: 'hsl(25, 95%, 55%)' },
  { name: 'Utilities', value: 18500, color: 'hsl(45, 90%, 50%)' },
  { name: 'Shopping', value: 12000, color: 'hsl(280, 60%, 55%)' },
  { name: 'Health', value: 8500, color: 'hsl(350, 70%, 55%)' },
  { name: 'Entertainment', value: 3200, color: 'hsl(160, 60%, 45%)' },
  { name: 'Travel', value: 2000, color: 'hsl(200, 70%, 50%)' },
  { name: 'Subscriptions', value: 4500, color: 'hsl(258, 65%, 58%)' },
];

export const chatHistory: ChatMessage[] = [
  { id: '1', role: 'assistant', content: 'Hi! I\'m your AI financial assistant. Ask me anything about your spending, savings, or financial goals.', timestamp: '2026-03-06T10:00:00' },
];

export const cashFlowForecast = [
  { name: 'Rent', amount: 25000, date: '2026-04-01' },
  { name: 'Electricity', amount: 3500, date: '2026-04-05' },
  { name: 'Insurance', amount: 12000, date: '2026-04-01' },
  { name: 'Netflix', amount: 649, date: '2026-04-01' },
  { name: 'Internet', amount: 1200, date: '2026-04-10' },
  { name: 'Groceries (est.)', amount: 8000, date: '2026-04-15' },
];
