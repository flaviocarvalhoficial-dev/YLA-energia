
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo.tsx';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    // Pequeno delay para feedback visual de carregamento
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-8 bg-background-light relative overflow-hidden"
    >
      {/* Blobs decorativos com pointer-events-none para não bloquear cliques */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm text-center relative z-10"
      >
        <div className="mb-10">
           <Logo className="w-56 h-28 mx-auto" />
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-left">
            <label className="block text-[10px] font-normal text-slate-400 uppercase tracking-widest mb-2 ml-4">E-mail de acesso</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-white border border-slate-100 rounded-[22px] py-4 px-6 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 shadow-sm transition-all outline-none font-medium"
            />
          </div>
          <div className="text-left">
            <label className="block text-[10px] font-normal text-slate-400 uppercase tracking-widest mb-2 ml-4">Senha pessoal</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-slate-100 rounded-[22px] py-4 px-6 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 shadow-sm transition-all outline-none font-medium"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full bg-slate-900 text-white font-black uppercase tracking-widest py-5 rounded-[22px] mt-10 active:scale-95 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800'}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>

        <p className="mt-8 text-slate-400 text-sm font-medium">
          Novo por aqui? <span className="text-primary font-bold cursor-pointer underline decoration-primary/30">Solicitar acesso</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
