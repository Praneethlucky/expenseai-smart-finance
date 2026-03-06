import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UtensilsCrossed, Plane, ShoppingBag, Zap, Heart, Gamepad2, RefreshCw, Wallet, Check } from 'lucide-react';
import { toast } from 'sonner';

const categoryIcons = [
  { name: 'Food', icon: UtensilsCrossed },
  { name: 'Travel', icon: Plane },
  { name: 'Shopping', icon: ShoppingBag },
  { name: 'Utilities', icon: Zap },
  { name: 'Health', icon: Heart },
  { name: 'Entertainment', icon: Gamepad2 },
  { name: 'Subscriptions', icon: RefreshCw },
  { name: 'Salary', icon: Wallet },
];

const paymentMethods = ['Credit Card', 'Debit Card', 'UPI', 'Cash', 'Bank Transfer', 'Auto-debit'];
const quickAmounts = [100, 500, 1000, 2000, 5000];

const AddExpenseScreen = () => {
  const { addTransaction } = useApp();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!amount || !description) {
      toast.error('Please fill amount and description');
      return;
    }
    addTransaction({
      amount: parseFloat(amount),
      type,
      category,
      description,
      paymentMethod,
      date,
      notes,
    });
    toast.success('Transaction added!');
    setAmount('');
    setDescription('');
    setNotes('');
  };

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Add Transaction</h1>

      {/* Type Toggle */}
      <div className="flex bg-muted rounded-xl p-1 mb-6">
        <button
          onClick={() => setType('expense')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${type === 'expense' ? 'bg-card shadow-card text-expense' : 'text-muted-foreground'}`}
        >Expense</button>
        <button
          onClick={() => setType('income')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${type === 'income' ? 'bg-card shadow-card text-income' : 'text-muted-foreground'}`}
        >Income</button>
      </div>

      {/* Amount */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Amount (₹)</label>
        <Input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0"
          className="h-14 rounded-xl text-2xl font-heading font-bold text-center"
        />
        <div className="flex gap-2 mt-2">
          {quickAmounts.map(a => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className="flex-1 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/80 transition-colors"
            >₹{a}</button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
        <div className="grid grid-cols-4 gap-2">
          {categoryIcons.map(c => {
            const Icon = c.icon;
            const isActive = category === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setCategory(c.name)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  isActive ? 'bg-primary text-primary-foreground shadow-button' : 'bg-card text-muted-foreground hover:bg-accent'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="What was this for?" className="h-11 rounded-xl" />
      </div>

      {/* Payment Method */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Payment Method</label>
        <div className="flex flex-wrap gap-2">
          {paymentMethods.map(p => (
            <button
              key={p}
              onClick={() => setPaymentMethod(p)}
              className={`text-xs px-3 py-2 rounded-full transition-colors ${paymentMethod === p ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-11 rounded-xl" />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-1.5 block">Notes (optional)</label>
        <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional notes..." className="rounded-xl" rows={2} />
      </div>

      <Button onClick={handleSubmit} variant="gradient" size="lg" className="w-full rounded-xl">
        <Check size={18} /> Add {type === 'income' ? 'Income' : 'Expense'}
      </Button>
    </div>
  );
};

export default AddExpenseScreen;
