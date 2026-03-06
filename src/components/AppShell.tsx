import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, PlusCircle, Receipt, Sparkles, UserCircle } from 'lucide-react';

const tabs = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { path: '/add', icon: PlusCircle, label: 'Add' },
  { path: '/bills', icon: Receipt, label: 'Bills' },
  { path: '/insights', icon: Sparkles, label: 'AI' },
  { path: '/profile', icon: UserCircle, label: 'Profile' },
];

const AppShell = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide bottom nav on auth pages
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-lg mx-auto w-full pb-20 lg:max-w-6xl">
        {children}
      </div>
      {!isAuthPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
          <div className="max-w-lg mx-auto flex items-center justify-around px-2 lg:max-w-6xl">
            {tabs.map(tab => {
              const isActive = location.pathname === tab.path;
              const Icon = tab.icon;
              const isAdd = tab.path === '/add';
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center py-2 px-3 transition-all duration-200 ${
                    isAdd
                      ? 'relative -mt-4'
                      : ''
                  }`}
                >
                  {isAdd ? (
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-button">
                      <Icon size={22} className="text-primary-foreground" />
                    </div>
                  ) : (
                    <>
                      <Icon size={20} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                      <span className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                        {tab.label}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppShell;
