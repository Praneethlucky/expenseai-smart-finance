import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";
import AppShell from "@/components/AppShell";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import TransactionsScreen from "@/screens/TransactionsScreen";
import AddExpenseScreen from "@/screens/AddExpenseScreen";
import BillsScreen from "@/screens/BillsScreen";
import InsightsScreen from "@/screens/InsightsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import CategoriesScreen from "@/screens/CategoriesScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <AppShell>
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><TransactionsScreen /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddExpenseScreen /></ProtectedRoute>} />
      <Route path="/bills" element={<ProtectedRoute><BillsScreen /></ProtectedRoute>} />
      <Route path="/insights" element={<ProtectedRoute><InsightsScreen /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><CategoriesScreen /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppShell>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
