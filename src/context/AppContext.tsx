import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Transaction, RecurringBill, Subscription } from '@/models/types';
import { Category } from '../models/category';
import { transactions as mockTransactions, categories as mockCategories, recurringBills as mockBills, subscriptions as mockSubs } from '@/services/mockData';
import { GetCategories } from "../services/categoryService";


interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  transactions: Transaction[];
  categories: Category[];
  recurringBills: RecurringBill[];
  subscriptions: Subscription[];
  currency: string;
  getCategories: () => void;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  addCategory: (c: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, c: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBill: (b: Omit<RecurringBill, 'id'>) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [txns, setTxns] = useState<Transaction[]>(mockTransactions);
  const [cats, setCats] = useState<Category[]>([]);
  const [bills, setBills] = useState<RecurringBill[]>(mockBills);
  const [subs] = useState<Subscription[]>(mockSubs);
  
  const getCategories = async() =>
  {
    var cats = await GetCategories();
    console.log(cats);
    setCats(cats);
  };

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    setTxns(prev => [{ ...t, id: Date.now().toString() }, ...prev]);
  };

  const addCategory = (c: Omit<Category, 'id'>) => {
    setCats(prev => [...prev, { ...c, id: Date.now().toString() }]);
  };

  const updateCategory = (id: string, c: Partial<Category>) => {
  };

  const deleteCategory = (id: string) => {
  };

  const addBill = (b: Omit<RecurringBill, 'id'>) => {
    setBills(prev => [...prev, { ...b, id: Date.now().toString() }]);
  };

  return (
    <AppContext.Provider value={{
      user, isAuthenticated, transactions: txns, categories: cats,
      recurringBills: bills, subscriptions: subs, currency: '₹',
      getCategories, addTransaction, addCategory, updateCategory, deleteCategory, addBill,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
