import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { mockUser } from '../data/mockData';
import { User, Mail, Shield, Calendar, HardDrive, FileStack, Save, Camera } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || mockUser.name);
  const [email, setEmail] = useState(user?.email || mockUser.email);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-10 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Profile</h1>
        <p className="text-base text-text-secondary mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="enterprise-card p-8 md:p-10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 relative z-10">
          {/* Avatar */}
          <div className="relative group cursor-pointer flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-surface-900 border border-white/10 flex items-center justify-center text-3xl font-bold text-text-primary shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] transition-transform duration-300 group-hover:scale-105">
              {initials}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center border border-white/20">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">{name}</h2>
            <p className="text-base text-text-secondary">{email}</p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-500 border border-primary-500/20">
                <Shield className="w-3.5 h-3.5" />
                {mockUser.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: FileStack, label: 'Documents', value: mockUser.documentsCount },
          { icon: HardDrive, label: 'Storage', value: `${mockUser.storageUsed} MB` },
          { icon: Calendar, label: 'Member since', value: new Date(mockUser.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
        ].map((stat) => (
          <div key={stat.label} className="enterprise-card p-6 flex items-center gap-5 hover-lift">
            <div className="p-3 rounded-lg bg-surface-800 border border-white/5 text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-text-primary tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      <div className="enterprise-card p-8 md:p-10">
        <h3 className="text-xl font-bold text-text-primary tracking-tight mb-8">Account Information</h3>
        <div className="space-y-6 max-w-xl">
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User className="w-4 h-4" />}
          />
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
          />

          <div className="flex items-center gap-5 pt-6 border-t border-white/5">
            <Button onClick={handleSave} size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save changes
            </Button>
            {saved && (
              <span className="text-sm text-primary-500 font-semibold animate-fade-in flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                Profile updated
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-error-500/20 p-8 md:p-10 bg-error-500/5 relative overflow-hidden">
        <h3 className="text-xl font-bold text-error-500 tracking-tight mb-3">Danger Zone</h3>
        <p className="text-sm text-error-400 mb-8 max-w-2xl leading-relaxed">
          Once you delete your account, there is no going back. All your documents, pipelines, and data will be permanently erased.
        </p>
        <Button variant="danger" size="md">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
