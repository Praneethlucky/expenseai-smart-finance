import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  variant: 'income' | 'expense' | 'savings' | 'neutral';
  subtitle?: string;
}

const variantClasses = {
  income: 'gradient-income',
  expense: 'gradient-expense',
  savings: 'gradient-savings',
  neutral: 'gradient-primary',
};

const StatCard = ({ title, value, icon, variant, subtitle }: StatCardProps) => (
  <div className={`${variantClasses[variant]} rounded-2xl p-5 text-primary-foreground shadow-card animate-scale-in`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium opacity-90">{title}</span>
      <div className="opacity-80">{icon}</div>
    </div>
    <p className="text-2xl font-heading font-bold">{value}</p>
    {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
  </div>
);

export default StatCard;
