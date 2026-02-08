
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, Plus, Bell, User } from 'lucide-react';

interface BottomNavProps {
  onPlusClick?: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onPlusClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'PAINEL', path: '/' },
    { icon: BarChart3, label: 'GRÁFICOS', path: '/statistics' },
    { icon: Plus, label: '', path: '/action', isAction: true },
    { icon: Bell, label: 'ALERTAS', path: '/alerts' },
    { icon: User, label: 'PERFIL', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pt-6 glass-nav border-t border-slate-100 flex items-center justify-around z-50">
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        if (item.isAction) {
          return (
            <div key="action" className="relative -top-10">
              <button 
                onClick={onPlusClick}
                className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center shadow-xl shadow-slate-300 active:scale-90 transition-all border-4 border-white"
              >
                <Icon className="text-primary" size={32} strokeWidth={3} />
              </button>
            </div>
          );
        }

        return (
          <button
            key={item.path || idx}
            onClick={() => item.path && navigate(item.path)}
            className={`flex flex-col items-center justify-center transition-all p-3 rounded-2xl ${isActive ? 'text-slate-900 bg-slate-50' : 'text-slate-400'}`}
            aria-label={item.label}
          >
            <Icon 
              size={24} 
              strokeWidth={isActive ? 2.5 : 2} 
              className={isActive ? 'opacity-100' : 'opacity-60'} 
            />
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
