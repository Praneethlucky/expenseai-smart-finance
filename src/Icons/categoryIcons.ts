import {
  UtensilsCrossed,
  Plane,
  ShoppingBag,
  Zap,
  Heart,
  Gamepad2,
  RefreshCw,
  Wallet,
  Home,
  Bus,
  Fuel,
  Shield,
  BookOpen,
  Gift,
  Smile,
  PawPrint,
  HeartHandshake,
  Receipt,
  FileText,
  Circle,
  TrendingUp,
  Coins,
  Percent,
  Briefcase,
  Laptop,
  BadgeDollarSign,
  RotateCcw,
  Building
} from "lucide-react";

export const categoryIconMap = {
  UtensilsCrossed,
  Plane,
  ShoppingBag,
  Zap,
  Heart,
  Gamepad2,
  RefreshCw,
  Wallet,
  Home,
  Bus,
  Fuel,
  Shield,
  BookOpen,
  Gift,
  Smile,
  PawPrint,
  HeartHandshake,
  Receipt,
  FileText,
  Circle,
  TrendingUp,
  Coins,
  Percent,
  Briefcase,
  Laptop,
  BadgeDollarSign,
  RotateCcw,
  Building
};

export const categoryIconList = Object.keys(categoryIconMap);

export const getCategoryIcon = (name: string) => {
  return categoryIconMap[name] || categoryIconMap.Circle;
};