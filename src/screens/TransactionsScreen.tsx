import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import TransactionItem from '@/components/TransactionItem';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Transaction } from '@/models/types';

const TransactionsScreen = () => {
  const { transactions, currency } = useApp();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest'>('newest');
  const [filterCat, setFilterCat] = useState<string>('');
  const [selected, setSelected] = useState<Transaction | null>(null);

  const cats = [...new Set(transactions.map(t => t.category))];

  let filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filterCat) filtered = filtered.filter(t => t.category === filterCat);

  filtered.sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    return b.amount - a.amount;
  });

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Transactions</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="pl-9 h-11 rounded-xl"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <SlidersHorizontal size={14} />
        </div>
        {['newest', 'oldest', 'highest'].map(s => (
          <button
            key={s}
            onClick={() => setSortBy(s as typeof sortBy)}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              sortBy === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <div className="w-px h-5 bg-border" />
        <button
          onClick={() => setFilterCat('')}
          className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap ${!filterCat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >All</button>
        {cats.map(c => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap ${filterCat === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >{c}</button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map(t => (
          <TransactionItem key={t.id} transaction={t} onClick={() => setSelected(t)} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No transactions found</p>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Transaction Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground text-sm">Description</span><span className="text-sm font-medium">{selected.description}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground text-sm">Amount</span><span className={`text-sm font-bold ${selected.type === 'income' ? 'text-income' : 'text-expense'}`}>{selected.type === 'income' ? '+' : '-'}{currency}{selected.amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground text-sm">Category</span><span className="text-sm">{selected.category}</span></div>
              {selected.subcategory && <div className="flex justify-between"><span className="text-muted-foreground text-sm">Subcategory</span><span className="text-sm">{selected.subcategory}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground text-sm">Date</span><span className="text-sm">{new Date(selected.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground text-sm">Payment</span><span className="text-sm">{selected.paymentMethod}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionsScreen;
