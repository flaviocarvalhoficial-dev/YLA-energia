
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Home, Bell, HelpCircle, ChevronRight, LogOut, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: User, label: 'Dados Pessoais' },
    { icon: Home, label: 'Configurações da Unidade' },
    { icon: Bell, label: 'Notificações' },
    { icon: HelpCircle, label: 'Ajuda e Suporte' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-40 min-h-screen bg-background-light"
    >
      <header className="p-6 flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-6 w-10 h-10 flex items-center justify-center text-slate-400 bg-white rounded-full border border-slate-100 shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-slate-900">Perfil</h1>
      </header>

      <section className="px-6 flex flex-col items-center mb-10 mt-4">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full p-1 border-[3px] border-primary profile-ring">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="https://picsum.photos/seed/ricardo/300/300" 
                alt="Ricardo Silva" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <Edit2 size={12} strokeWidth={2} className="text-black" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Ricardo Silva</h2>
        <p className="text-slate-500 text-sm font-medium">ricardo.silva@email.com</p>
      </section>

      <section className="px-6 space-y-4">
        {menuItems.map((item, i) => (
          <motion.button 
            key={item.label}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="w-full flex items-center justify-between p-5 bg-white rounded-[24px] shadow-card-float border border-slate-50 active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                <item.icon className="text-primary" size={20} />
              </div>
              <span className="font-bold text-slate-800 text-[15px]">{item.label}</span>
            </div>
            <ChevronRight className="text-slate-400" size={18} />
          </motion.button>
        ))}

        <div className="pt-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-5 bg-red-50 rounded-[24px] border border-red-100 active:scale-[0.98] transition-transform group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-red-500/10 rounded-full">
                <LogOut className="text-red-500" size={20} />
              </div>
              <span className="font-bold text-red-600 text-[15px]">Sair</span>
            </div>
          </button>
        </div>
      </section>

      <div className="text-center mt-12">
        <p className="text-slate-400 text-[10px] font-normal uppercase tracking-[0.2em]">YLA ENERGY V1.0.4</p>
      </div>
    </motion.div>
  );
};

export default Profile;
