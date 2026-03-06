import { Transaction } from '@/models/types';
import { UtensilsCrossed, Plane, ShoppingBag, Zap, Heart, Gamepad2, RefreshCw, Wallet } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Food: <UtensilsCrossed size={18} />,
  Travel: <Plane size={18} />,
  Shopping: <ShoppingBag size={18} />,
  Utilities: <Zap size={18} />,
  Health: <Heart size={18} />,
  Entertainment: <Gamepad2 size={18} />,
  Subscriptions: <RefreshCw size={18} />,
  Salary: <Wallet size={18} />,
};

const colorMap: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-600',
  Travel: 'bg-blue-100 text-blue-600',
  Shopping: 'bg-purple-100 text-purple-600',
  Utilities: 'bg-yellow-100 text-yellow-600',
  Health: 'bg-red-100 text-red-600',
  Entertainment: 'bg-emerald-100 text-emerald-600',
  Subscriptions: 'bg-violet-100 text-violet-600',
  Salary: 'bg-green-100 text-green-600',
};

interface Props {
  transaction: Transaction;
  onClick?: () => void;
}

const TransactionItem = ({ transaction, onClick }: Props) => {
  const isIncome = transaction.type === 'income';

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl bg-card hover:shadow-card-hover transition-all duration-200 cursor-pointer"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[transaction.category] || 'bg-muted text-muted-foreground'}`}>
        {iconMap[transaction.category] || <Wallet size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{transaction.description}</p>
        <p className="text-xs text-muted-foreground">{transaction.category}{transaction.subcategory ? ` · ${transaction.subcategory}` : ''}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${isIncome ? 'text-income' : 'text-expense'}`}>
          {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(transaction.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
