import { useState } from 'react';
import { aiInsights, financialHealth, cashFlowForecast, chatHistory as initialChat } from '@/services/mockData';
import { Sparkles, AlertTriangle, Lightbulb, Info, TrendingUp, MessageCircle, Send, BarChart3, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/models/types';
import { useApp } from '@/context/AppContext';

const insightIcons = {
  anomaly: <AlertTriangle size={16} className="text-warning" />,
  tip: <Lightbulb size={16} className="text-income" />,
  info: <Info size={16} className="text-secondary" />,
  warning: <AlertTriangle size={16} className="text-expense" />,
};

const InsightsScreen = () => {
  const { currency } = useApp();
  const [tab, setTab] = useState<'insights' | 'health' | 'forecast' | 'chat'>('insights');
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending data, food expenses make up 35% of your monthly budget. Consider meal prepping to reduce costs.",
        "Your savings rate of 32% is above average. Great job! Consider investing surplus in a high-yield savings account.",
        "I noticed your subscriptions total ₹2,400/month. You haven't used Amazon Prime in 2 months - consider pausing it.",
        "Your biggest expense category is Utilities at ₹18,500. The electricity component seems high - have you checked for energy efficiency options?",
      ];
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const forecastTotal = cashFlowForecast.reduce((s, f) => s + f.amount, 0);

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
        <Sparkles size={22} className="text-primary" /> AI Insights
      </h1>

      {/* Tabs */}
      <div className="flex bg-muted rounded-xl p-1 mb-6 overflow-x-auto">
        {([
          { key: 'insights', label: 'Insights', icon: Sparkles },
          { key: 'health', label: 'Health', icon: Target },
          { key: 'forecast', label: 'Forecast', icon: BarChart3 },
          { key: 'chat', label: 'Chat', icon: MessageCircle },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap px-2 ${
              tab === t.key ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground'
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Insights Tab */}
      {tab === 'insights' && (
        <div className="space-y-3">
          {aiInsights.map(insight => (
            <div key={insight.id} className="bg-card rounded-xl p-4 shadow-card animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{insightIcons[insight.type]}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{insight.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Health Tab */}
      {tab === 'health' && (
        <div>
          <div className="bg-card rounded-2xl p-6 shadow-card text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Financial Health Score</p>
            <div className="relative w-32 h-32 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="10"
                  strokeDasharray={`${(financialHealth.score / 100) * 327} 327`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-heading font-bold text-foreground">{financialHealth.score}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-income">Good</p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Savings Rate', value: `${financialHealth.savingsRate}%`, good: true },
              { label: 'Subscription Burden', value: `${financialHealth.subscriptionBurden}%`, good: financialHealth.subscriptionBurden < 20 },
              { label: 'Expense Growth', value: `${financialHealth.expenseGrowth}%`, good: financialHealth.expenseGrowth < 10 },
              { label: 'Income Stability', value: `${financialHealth.incomeStability}%`, good: true },
            ].map(m => (
              <div key={m.label} className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{m.label}</span>
                <span className={`text-sm font-bold ${m.good ? 'text-income' : 'text-expense'}`}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forecast Tab */}
      {tab === 'forecast' && (
        <div>
          <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
            <p className="text-sm text-muted-foreground mb-1">Predicted Next Month</p>
            <p className="text-2xl font-heading font-bold text-expense">{currency}{forecastTotal.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            {cashFlowForecast.map(item => (
              <div key={item.name} className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                </div>
                <p className="text-sm font-bold text-foreground">{currency}{item.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {tab === 'chat' && (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 240px)' }}>
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'gradient-primary text-primary-foreground rounded-br-md'
                    : 'bg-card shadow-card text-foreground rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about your finances..."
              className="flex-1 h-11 rounded-xl"
            />
            <button onClick={sendMessage} className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center shadow-button">
              <Send size={18} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsScreen;
