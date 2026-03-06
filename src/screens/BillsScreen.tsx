import { useApp } from '@/context/AppContext';
import { subscriptions, recurringBills } from '@/services/mockData';
import { Receipt, CalendarDays, RefreshCw } from 'lucide-react';

const BillsScreen = () => {
  const { currency } = useApp();

  const monthlySubTotal = subscriptions
    .filter(s => s.billingCycle === 'monthly')
    .reduce((s, sub) => s + sub.amount, 0);

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Bills & Subscriptions</h1>

      {/* Subscription Total */}
      <div className="gradient-primary rounded-2xl p-5 mb-6 text-primary-foreground">
        <div className="flex items-center gap-2 mb-1">
          <RefreshCw size={18} className="opacity-80" />
          <span className="text-sm opacity-80">Monthly Subscriptions</span>
        </div>
        <p className="text-3xl font-heading font-bold">{currency}{monthlySubTotal.toLocaleString()}/mo</p>
      </div>

      {/* Subscriptions */}
      <h3 className="font-heading font-semibold text-foreground mb-3">Active Subscriptions</h3>
      <div className="space-y-2 mb-8">
        {subscriptions.map(sub => (
          <div key={sub.id} className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{sub.name}</p>
              <p className="text-xs text-muted-foreground">
                Next: {new Date(sub.nextBillingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">{currency}{sub.amount}</p>
              <p className="text-xs text-muted-foreground">/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recurring Bills */}
      <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
        <Receipt size={16} /> Upcoming Bills
      </h3>
      <div className="space-y-2">
        {recurringBills.map(bill => (
          <div key={bill.id} className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{bill.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarDays size={12} />
                {new Date(bill.nextPaymentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · {bill.frequency}
              </p>
            </div>
            <p className="text-sm font-bold text-foreground">{currency}{bill.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsScreen;
