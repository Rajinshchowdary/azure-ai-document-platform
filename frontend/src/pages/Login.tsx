import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Mail, Lock, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-[420px] animate-fade-in relative z-10 mt-[-5%]">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-surface-900 border border-white/10 shadow-[0_0_25px_rgba(16,185,129,0.15)] mb-6">
            <Sparkles className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Welcome back</h1>
          <p className="text-text-secondary mt-2 text-base">Sign in to your DocuMind AI account</p>
        </div>

        {/* Card */}
        <div className="enterprise-card p-8 md:p-10 border-t-2 border-t-primary-500/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
            />

            {error && (
              <p className="text-sm text-error-500 bg-error-500/10 border border-error-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-error-500" />
                {error}
              </p>
            )}

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-2.5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                <input type="checkbox" className="rounded border-white/10 bg-surface-900 text-primary-500 focus:ring-primary-500/50 w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="text-primary-500 hover:text-primary-400 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              Sign in
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-xs font-medium text-text-muted bg-surface-800 uppercase tracking-wider">or continue with</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 px-5 py-2.5 rounded-lg border border-white/10 bg-surface-900 text-sm font-medium text-text-primary hover:bg-surface-800 transition-colors cursor-pointer shadow-sm active:scale-[0.98]">
            <svg className="w-5 h-5" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
            Sign in with Microsoft
          </button>
        </div>

        <p className="text-center text-sm text-text-secondary mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-500 hover:text-primary-400 font-semibold transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
