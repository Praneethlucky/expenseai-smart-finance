import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from "./AuthContext";

import { User, Mail, DollarSign, Moon, Download, LogOut, ChevronRight, Shield } from 'lucide-react';

const ProfileScreen = () => {
  const {user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Profile</h1>

      {/* User Card */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-6 flex items-center gap-4">
        <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-xl">
          {user?.fullName?.charAt(0) || 'A'}
        </div>
        <div>
          <p className="font-semibold text-foreground">{user?.fullName || 'Alex Johnson'}</p>
          <p className="text-sm text-muted-foreground">{user?.email || 'alex@example.com'}</p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-1">
        {[
          { icon: User, label: 'Edit Profile', action: () => {} },
          { icon: DollarSign, label: 'Currency', value: '₹ INR', action: () => {} },
          { icon: Shield, label: 'Manage Categories', action: () => navigate('/categories') },
          { icon: Shield, label: 'Bills', action: () => navigate('/viewBills') },
          { icon: Shield, label: 'Balances', action: () => navigate('/balances') },
          { icon: Moon, label: 'Dark Mode', value: 'Off', action: () => {} },
          { icon: Download, label: 'Export Data', action: () => {} },
        ].map(item => (
          <button
            key={item.label}
            onClick={item.action}
            className="w-full bg-card rounded-xl p-4 shadow-card flex items-center gap-3 hover:shadow-card-hover transition-shadow"
          >
            <item.icon size={18} className="text-muted-foreground" />
            <span className="flex-1 text-sm font-medium text-foreground text-left">{item.label}</span>
            {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <Button onClick={handleLogout} variant="outline" size="lg" className="w-full mt-8 rounded-xl text-expense border-expense/20">
        <LogOut size={18} /> Log Out
      </Button>
    </div>
  );
};

export default ProfileScreen;
