
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Share2, TrendingUp, ReceiptText, ShieldCheck, FileText, MapPin, Hash, Zap } from 'lucide-react';
import AnimatedNumber from '../components/AnimatedNumber.tsx';

const ActivityDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const activities = [
    { id: '1', title: 'Produção Pico', time: 'Hoje, 12:45', value: 4.5, unit: 'kW', status: 'Gerando', type: 'production', desc: 'Seu sistema atingiu o pico de geração diária às 12:45 com céu limpo e alta radiação.' },
    { id: '2', title: 'Fatura de Crédito', time: 'Ontem, 09:30', value: 120, unit: 'kWh', status: 'Compensado', type: 'invoice', desc: 'Processamento de crédito referente ao ciclo de leitura anterior realizado com sucesso.' },
    { id: '3', title: 'Manutenção OK', time: '12 Out, 15:00', value: 100, unit: '%', status: 'Saudável', type: 'maintenance', desc: 'Relatório técnico confirma que todos os sensores e módulos estão operando dentro dos parâmetros.' },
  ];

  const activity = activities.find(a => a.id === id) || activities[0];

  const getIcon = () => {
    switch (activity.type) {
      case 'production': return TrendingUp;
      case 'invoice': return ReceiptText;
      case 'maintenance': return ShieldCheck;
      default: return TrendingUp;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="pb-32 min-h-screen bg-background-light"
    >
      <header className="p-6 flex items-center justify-between sticky top-0 bg-background-light/80 backdrop-blur-xl z-10 border-b border-slate-100">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full shadow-sm text-slate-400 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Detalhes do Evento</h1>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full shadow-sm text-slate-400">
          <Share2 size={18} />
        </button>
      </header>

      <div className="p-6 space-y-8">
        <div className="flex flex-col items-center text-center py-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-24 h-24 rounded-[32px] flex items-center justify-center mb-6 shadow-xl ${
              activity.type === 'production' ? 'bg-primary text-black shadow-primary/20' :
              activity.type === 'invoice' ? 'bg-orange-100 text-orange-600 shadow-orange-100' : 'bg-blue-100 text-blue-600 shadow-blue-100'
            }`}
          >
            <Icon size={42} strokeWidth={2.5} />
          </motion.div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">{activity.title}</h2>
          <p className="text-slate-400 text-[10px] font-normal uppercase tracking-[0.2em]">{activity.time}</p>
        </div>

        <section className="bg-white p-10 rounded-[40px] border border-slate-100 text-center shadow-card-float relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <p className="text-[10px] text-slate-400 font-normal uppercase tracking-widest mb-4">Valor Registrado</p>
          <div className="flex items-baseline justify-center gap-3">
            <h3 className="text-7xl font-black text-slate-900 tracking-tight">
              <AnimatedNumber value={activity.value} decimals={1} />
            </h3>
            <span className="text-slate-400 font-bold text-xl uppercase tracking-tighter">{activity.unit}</span>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-50">
            <div className="flex items-center justify-center gap-2 mb-6">
               <div className={`w-2 h-2 rounded-full ${
                 activity.type === 'production' ? 'bg-primary animate-pulse' : 'bg-slate-300'
               }`}></div>
               <span className="text-[10px] font-normal uppercase tracking-widest text-slate-500">{activity.status}</span>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed px-2 font-normal italic opacity-80">
              "{activity.desc}"
            </p>
          </div>
        </section>

        <section className="space-y-4">
           <h3 className="text-[10px] font-normal text-slate-400 uppercase tracking-[0.2em] px-2">Análise Técnica</h3>
           <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-soft space-y-5">
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <Hash size={16} className="text-slate-300" />
                 <span className="text-[13px] text-slate-500 font-normal">ID da Transação</span>
               </div>
               <span className="text-[13px] font-bold text-slate-900 font-mono">#TX-{id}00-99</span>
             </div>
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <MapPin size={16} className="text-slate-300" />
                 <span className="text-[13px] text-slate-500 font-normal">Localização</span>
               </div>
               <span className="text-[13px] font-bold text-slate-900">Residência Principal</span>
             </div>
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <Zap size={16} className="text-slate-300" />
                 <span className="text-[13px] text-slate-500 font-normal">Eficiência Esperada</span>
               </div>
               <span className="text-[13px] font-bold text-primary">+12%</span>
             </div>
           </div>
        </section>

        <button className="w-full bg-primary text-black font-black text-xs uppercase tracking-[0.2em] py-5 rounded-[24px] shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3">
          <FileText size={18} strokeWidth={2.5} />
          Gerar Relatório PDF
        </button>
      </div>
    </motion.div>
  );
};

export default ActivityDetail;
