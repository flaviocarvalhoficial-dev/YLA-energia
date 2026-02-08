
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal, AlertTriangle, WifiOff, Info } from 'lucide-react';

type FilterType = 'Todos' | 'Urgentes' | 'Lidos';

const Alerts: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');

  const allAlerts = useMemo(() => [
    { 
      id: 1, 
      title: 'Produção Abaixo do Esperado', 
      desc: 'Seu sistema produziu 15% menos que a média histórica para este horário.', 
      time: '10:30 AM', 
      icon: AlertTriangle, 
      color: 'orange',
      isUrgent: true,
      isRead: false
    },
    { 
      id: 2, 
      title: 'Sistema Offline', 
      desc: 'Inversor #420-B perdeu conexão com a rede. A monitoração em tempo real está suspensa.', 
      time: '08:15 AM', 
      icon: WifiOff, 
      color: 'red',
      isUrgent: true,
      isRead: false
    },
    { 
      id: 3, 
      title: 'Créditos Expirando', 
      desc: 'Cerca de 250kWh em créditos expiram em 30 dias. Considere redistribuir.', 
      time: 'ONTEM', 
      icon: Info, 
      color: 'primary',
      isUrgent: false,
      isRead: true
    },
    { 
      id: 4, 
      title: 'Manutenção Concluída', 
      desc: 'A limpeza programada dos painéis foi finalizada com sucesso.', 
      time: '02 OUT', 
      icon: Info, 
      color: 'primary',
      isUrgent: false,
      isRead: true
    },
  ], []);

  const filteredAlerts = useMemo(() => {
    switch (activeFilter) {
      case 'Urgentes':
        return allAlerts.filter(alert => alert.isUrgent);
      case 'Lidos':
        return allAlerts.filter(alert => alert.isRead);
      default:
        return allAlerts;
    }
  }, [activeFilter, allAlerts]);

  const filterButtons: FilterType[] = ['Todos', 'Urgentes', 'Lidos'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-40 px-6 pt-12 bg-background-light min-h-screen"
    >
      <header className="flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 shadow-sm border border-slate-100 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-slate-900 uppercase tracking-widest">Centro de Alertas</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 shadow-sm border border-slate-100">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
        {filterButtons.map((btn) => (
          <button
            key={btn}
            onClick={() => setActiveFilter(btn)}
            className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest transition-all shrink-0 ${
              activeFilter === btn 
                ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20' 
                : 'bg-white text-slate-400 font-normal border border-slate-100'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="space-y-4 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, i) => {
              const Icon = alert.icon;
              return (
                <motion.div 
                  key={alert.id}
                  layout
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 bg-white rounded-[28px] flex gap-4 shadow-card-float border border-slate-50"
                >
                  <div className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-[18px] ${
                    alert.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                    alert.color === 'red' ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-900 text-[14px]">{alert.title}</h3>
                      <span className="text-[9px] font-normal text-slate-400 uppercase tracking-widest mt-1">{alert.time}</span>
                    </div>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-normal">{alert.desc}</p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
                <Info size={32} />
              </div>
              <p className="text-slate-400 text-sm font-medium">Nenhum alerta encontrado nesta categoria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-between items-center px-2">
        <h2 className="text-[10px] font-normal text-slate-400 uppercase tracking-[0.15em]">Anteriores</h2>
        <button 
          onClick={() => alert('Filtro de histórico em breve')}
          className="text-[10px] font-normal text-primary uppercase tracking-widest active:scale-95 transition-transform"
        >
          Limpar Tudo
        </button>
      </div>
    </motion.div>
  );
};

export default Alerts;
