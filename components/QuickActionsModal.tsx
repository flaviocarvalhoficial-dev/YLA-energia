
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wrench, UserPlus, MessageCircle, FilePlus, Sparkles, Coins } from 'lucide-react';

interface QuickActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickActionsModal: React.FC<QuickActionsModalProps> = ({ isOpen, onClose }) => {
  const actions = [
    { 
      icon: Coins, 
      title: 'Aquisição de Créditos', 
      desc: 'Solicite a aquisição ou uso de créditos solares para reduzir sua fatura atual.', 
      color: 'bg-yellow-50 text-yellow-600' 
    },
    { 
      icon: Wrench, 
      title: 'Solicitar Manutenção', 
      desc: 'Agende uma visita técnica preventiva ou corretiva.', 
      color: 'bg-blue-50 text-blue-600' 
    },
    { 
      icon: FilePlus, 
      title: 'Novo Orçamento', 
      desc: 'Deseja ampliar seu sistema ou instalar em outro local?', 
      color: 'bg-primary/10 text-slate-900' 
    },
    { 
      icon: UserPlus, 
      title: 'Indicar Amigo', 
      desc: 'Ganhe descontos em sua fatura por cada indicação ativa.', 
      color: 'bg-orange-50 text-orange-600' 
    },
    { 
      icon: MessageCircle, 
      title: 'Falar com Especialista', 
      desc: 'Tire dúvidas sobre sua geração ou faturamento.', 
      color: 'bg-green-50 text-green-600' 
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] max-w-md mx-auto"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] z-[110] p-8 pb-12 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-black text-slate-900">O que você precisa?</h2>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Ações Rápidas YLA</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-full text-slate-400 active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto no-scrollbar pr-1">
              {actions.map((action, i) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    alert(`Solicitação enviada: ${action.title}`);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-[24px] hover:border-primary/40 transition-all text-left group active:scale-[0.98]"
                >
                  <div className={`w-12 h-12 shrink-0 rounded-[18px] flex items-center justify-center ${action.color}`}>
                    <action.icon size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{action.title}</h3>
                    <p className="text-[11px] text-slate-400 font-normal leading-relaxed">{action.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-8 p-5 bg-slate-900 rounded-[28px] flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Dica Premium</p>
                <p className="text-white text-[12px] font-medium max-w-[180px]">Mantenha seus painéis limpos para +15% de eficiência.</p>
              </div>
              <Sparkles className="text-primary/20 absolute -right-4 -bottom-4" size={80} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickActionsModal;
