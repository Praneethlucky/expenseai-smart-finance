import { useApp } from '@/context/AppContext';
import StatCard from '@/components/StatCard';
import TransactionItem from '@/components/TransactionItem';
import { TrendingUp, TrendingDown, PiggyBank, Percent, Sparkles, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { expenseBreakdown, monthlySpending, aiInsights } from '@/services/mockData';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const { transactions, currency } = useApp();
  const navigate = useNavigate();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

  const recentTxns = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="gradient-header rounded-2xl p-5 mb-6 text-primary-foreground">
        <p className="text-sm opacity-80">Welcome back</p>
        <h1 className="text-2xl font-heading font-bold mt-1">Alex Johnson</h1>
        <p className="text-sm opacity-70 mt-1">March 2026</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard title="Income" value={`${currency}${totalIncome.toLocaleString()}`} icon={<TrendingUp size={20} />} variant="income" />
        <StatCard title="Expenses" value={`${currency}${totalExpenses.toLocaleString()}`} icon={<TrendingDown size={20} />} variant="expense" />
        <StatCard title="Savings" value={`${currency}${savings.toLocaleString()}`} icon={<PiggyBank size={20} />} variant="savings" />
        <StatCard title="Savings Rate" value={`${savingsRate}%`} icon={<Percent size={20} />} variant="neutral" subtitle="of income" />
      </div>

      {/* Expense Breakdown */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Expense Breakdown</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
              {expenseBreakdown.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${currency}${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-2 mt-2">
          {expenseBreakdown.map(e => (
            <div key={e.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
              {e.name}
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Spending Trend</h3>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={monthlySpending}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(258, 65%, 58%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(258, 65%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip formatter={(value: number) => `${currency}${value.toLocaleString()}`} />
            <Area type="monotone" dataKey="amount" stroke="hsl(258, 65%, 58%)" fill="url(#colorSpend)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights Summary */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> AI Insights
          </h3>
          <button onClick={() => navigate('/insights')} className="text-xs text-primary font-medium flex items-center gap-0.5">
            View all <ChevronRight size={14} />
          </button>
        </div>
        {aiInsights.slice(0, 2).map(insight => (
          <div key={insight.id} className="p-3 bg-accent/50 rounded-xl mb-2 last:mb-0">
            <p className="text-sm font-medium text-foreground">{insight.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-foreground">Recent Transactions</h3>
          <button onClick={() => navigate('/transactions')} className="text-xs text-primary font-medium flex items-center gap-0.5">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-2">
          {recentTxns.map(t => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
