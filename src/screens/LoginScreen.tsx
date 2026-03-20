import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { loginUser } from '../services/loginService';
import { LoginRequest, LoginResponse } from "../models/user";
import { storage } from '@/storage';
import { useAuth } from "./AuthContext";


const LoginScreen = () => {
  const [email, setEmail] = useState('@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserProfile } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const request: LoginRequest = {email, password, deviceId: storage.deviceType};
      const respone = await loginUser(request);
      await setUserProfile();
      navigate("/")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-button">
            <Sparkles className="text-primary-foreground" size={28} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">ExpenseAI</h1>
          <p className="text-muted-foreground mt-1">Smart expense tracking</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-xl pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
                  {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}
          <Button type="submit" variant="gradient" size="lg" className="w-full rounded-xl">
            Log In
          </Button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <button className="text-sm text-primary hover:underline">Forgot password?</button>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
