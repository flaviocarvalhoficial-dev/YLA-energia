
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, TrendingUp, Sun, Zap, ReceiptText, Headset, ChevronRight, X, Info, ShieldCheck, Activity, Sparkles, Coins, ShoppingBag, ArrowRight, Gift, Users } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import AnimatedNumber from '../components/AnimatedNumber.tsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const DetailModal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon: Icon, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
        />
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] z-[70] p-8 border-t border-slate-100 shadow-2xl overflow-hidden"
          style={{ maxHeight: '90vh', paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
        >
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8 cursor-pointer" onClick={onClose} />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 bg-primary/10 rounded-[18px] flex items-center justify-center">
              <Icon className="text-primary" size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            <button onClick={onClose} className="ml-auto w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <X size={18} />
            </button>
          </div>
          <div className="overflow-y-auto no-scrollbar pb-10">
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AIInsightCard: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchInsight() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Gere um resumo curto e humanizado para o Ricardo sobre seu sistema solar: 340kWh gerados no mês, 1284kWh em créditos e economia de R$ 842,50. Seja motivador e use no máximo 20 palavras.",
          config: {
            systemInstruction: "Você é um assistente de IA amigável da YLA Energia. Sua missão é dar um insight diário rápido, objective e carinhoso para o usuário.",
            temperature: 0.7,
          }
        });
        setInsight(response.text || "Seu sistema está operando em alta performance hoje! Ótimo dia para gerar energia limpa.");
      } catch (error) {
        console.error("AI Error:", error);
        setInsight("Ricardo, sua geração este mês está 12% acima da média. Excelente economia!");
      } finally {
        setLoading(false);
      }
    }
    fetchInsight();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ x: "120%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-[calc(115px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[340px] p-5 bg-white rounded-[28px] border-2 border-primary/40 shadow-[0_25px_60px_rgba(0,0,0,0.18)] flex gap-4 items-start z-[55]"
        >
          <div className="w-10 h-10 bg-primary rounded-[16px] flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <span className="text-slate-900"><Sparkles size={18} strokeWidth={2.5} /></span>
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
                ATUALIZAÇÃO DIÁRIA
              </p>
              {loading && (
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                </div>
              )}
            </div>
            <div className="min-h-[40px] w-full">
              {loading ? (
                <div className="space-y-2 mt-1 w-full">
                  <div className="h-2.5 w-full bg-slate-100 rounded-full animate-pulse"></div>
                  <div className="h-2.5 w-4/5 bg-slate-100 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <p className="text-[12px] text-slate-800 leading-relaxed font-normal break-words">
                  {insight}
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="shrink-0 text-slate-300 hover:text-slate-900 transition-colors p-1 -mr-2 -mt-1 active:scale-90"
            aria-label="Fechar insight"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Dashboard: React.FC = () => {
  const [activeModal, setActiveModal] = useState<{title: string, icon: React.ElementType, id: string} | null>(null);
  const navigate = useNavigate();

  const activities = [
    { id: '1', title: 'Produção Pico', time: 'Hoje, 12:45', value: '+ 4.5 kW', status: 'Gerando', type: 'production' },
    { id: '2', title: 'Fatura de Crédito', time: 'Ontem, 09:30', value: '120 kWh', status: 'Compensado', type: 'invoice' },
    { id: '3', title: 'Manutenção OK', time: '12 Out, 15:00', value: 'Saudável', status: 'Verificado', type: 'maintenance' },
  ];

  const actions = [
    { icon: Sun, label: 'Produção', id: 'Produção' },
    { icon: Zap, label: 'Consumo', id: 'Consumo' },
    { icon: ReceiptText, label: 'Faturas', id: 'Faturas' },
    { icon: Coins, label: 'Créditos', id: 'Créditos' },
    { icon: Headset, label: 'Suporte', id: 'Suporte' }
  ];

  const handleActionClick = (action: typeof actions[0]) => {
    if (action.id === 'Consumo') {
      navigate('/consumption');
    } else {
      setActiveModal({title: action.label, icon: action.icon, id: action.id});
    }
  };

  const offers = [
    {
      id: 'o1',
      title: 'Limpeza Premium',
      desc: 'Aumente sua geração em até 20%.',
      price: 'R$ 199',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'o2',
      title: 'Expanda o Sistema',
      desc: 'Mais módulos, mais economia mensal.',
      price: 'Sob Consulta',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'o3',
      title: 'Kit Monitoramento',
      desc: 'Sensores de alta precisão via app.',
      price: 'R$ 450',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const renderModalContent = () => {
    if (!activeModal) return null;
    
    if (activeModal.id === 'Créditos') {
      return (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-[32px] text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Saldo Disponível</p>
            <div className="flex items-baseline gap-2 mb-6">
               <h3 className="text-5xl font-black text-white">1.284</h3>
               <span className="text-primary font-black text-xl">kWh</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Próximo Vencimento</p>
                <p className="text-sm font-bold text-slate-200">120 kWh (30 dias)</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Valor Estimado</p>
                <p className="text-sm font-bold text-primary">R$ 898,80</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
             <button className="w-full bg-primary text-slate-900 py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl shadow-primary/20">
                Solicitar Resgate de Créditos
             </button>
             <button className="w-full bg-white border-2 border-slate-100 text-slate-900 py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all">
                Transferir para Outra Unidade
             </button>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-[20px] flex gap-3 items-center">
            <Info className="text-slate-300" size={16} />
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
              Solicitações de resgate levam até 48h para processamento pela concessionária.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="p-6 bg-slate-50 rounded-[28px] border border-slate-100">
          <p className="text-[10px] text-slate-400 font-normal uppercase mb-4 tracking-widest text-center">Status Operacional</p>
          <div className="flex justify-between items-center mb-4">
             <span className="text-slate-700 text-sm font-semibold">Saúde do Sistema</span>
             <span className="text-primary font-normal bg-primary/10 px-4 py-1.5 rounded-full text-[10px] uppercase">Normal</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-slate-700 text-sm font-semibold">Próximo Ciclo</span>
             <span className="text-slate-900 font-bold text-sm">02 Dez 2024</span>
          </div>
        </div>
        <button className="w-full bg-slate-900 text-white py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl shadow-slate-200">
          Gerar Relatório Detalhado
        </button>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-64 bg-background-light min-h-[100dvh] relative"
    >
      <header className="p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-4 ring-white shadow-soft">
            <img 
              src="https://picsum.photos/seed/ricardo/200/200" 
              className="w-full h-full object-cover rounded-full" 
              alt="Ricardo Silva" 
            />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-normal uppercase tracking-[0.15em] mb-0.5">YLA ENERGY</p>
            <h1 className="text-lg font-bold text-slate-900">Olá, Ricardo</h1>
          </div>
        </div>
        <button className="w-11 h-11 flex items-center justify-center bg-white rounded-full relative border border-slate-100 shadow-sm active:scale-90 transition-transform">
          <Bell className="text-slate-600" size={20} />
          <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-secondary rounded-full ring-2 ring-white"></span>
        </button>
      </header>

      <section className="px-6 mb-10">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Painel Geral</h2>
          <button 
            onClick={() => navigate('/system-detail')}
            className="text-[10px] font-normal text-primary flex items-center gap-1 uppercase tracking-widest"
          >
            Insights <ChevronRight size={12} strokeWidth={2} />
          </button>
        </div>
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => navigate('/system-detail')}
          className="bg-slate-900 p-8 rounded-[32px] relative overflow-hidden shadow-card-float cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/20 rounded-full blur-[64px] opacity-40"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
             <div className="flex flex-col">
               <p className="text-slate-400 text-[10px] font-normal uppercase tracking-widest mb-1">Geração mensal</p>
               <div className="flex items-baseline gap-1.5">
                 <h3 className="text-white text-6xl font-black tracking-tight">
                   <AnimatedNumber value={340} decimals={0} />
                 </h3>
                 <span className="text-primary text-xl font-black">kWh</span>
               </div>
             </div>
             <div className="w-10 h-10 bg-white/10 rounded-[16px] flex items-center justify-center backdrop-blur-sm border border-white/10">
                <TrendingUp className="text-primary" size={20} />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/[0.08] relative z-10">
            <div>
              <p className="text-slate-500 text-[9px] uppercase font-normal tracking-wider mb-1">Créditos</p>
              <p className="text-white font-black text-xl leading-none">1.284 <span className="text-[11px] text-primary/80 font-normal">kWh</span></p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[9px] uppercase font-normal tracking-wider mb-1">Economia</p>
              <p className="text-white font-black text-xl leading-none">R$ 842 <span className="text-[11px] opacity-40 font-normal">,50</span></p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mb-10 relative">
        <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-2">
          {actions.map((action, i) => (
            <motion.button 
              key={action.label}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleActionClick(action)}
              className="flex flex-col items-center gap-2.5 shrink-0"
            >
              <div className="w-[72px] h-[72px] flex items-center justify-center bg-white rounded-[24px] border border-slate-100 active:scale-95 transition-all shadow-soft">
                <action.icon className="text-slate-800" size={24} />
              </div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="px-6 mb-10">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Fluxo Recente</h2>
          <button className="text-[10px] font-normal text-slate-300 uppercase tracking-widest">Ver Histórico</button>
        </div>
        <div className="space-y-3">
          {activities.map((act, i) => (
            <motion.div 
              key={act.id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/activity/${act.id}`)}
              className="flex items-center justify-between p-4 bg-white rounded-[24px] border border-slate-50 cursor-pointer active:scale-[0.99] transition-all shadow-soft"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 flex items-center justify-center rounded-[16px] ${
                  act.type === 'production' ? 'bg-primary/10 text-primary' :
                  act.type === 'invoice' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {act.type === 'production' ? <Activity size={18} /> : 
                   act.type === 'invoice' ? <ReceiptText size={18} /> : <ShieldCheck size={18} />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-slate-900">{act.title}</p>
                  <p className="text-[9px] font-normal text-slate-400 uppercase">{act.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-base font-black tracking-tight ${act.type === 'production' ? 'text-primary' : 'text-slate-900'}`}>
                  {act.value}
                </p>
                <p className="text-[8px] text-slate-500 uppercase font-normal tracking-widest">{act.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 px-7">
          <h2 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Ofertas para Você</h2>
          <button className="text-[10px] font-normal text-primary uppercase tracking-widest">Shop YLA</button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-4">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-[155px] shrink-0 bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-soft group cursor-pointer flex flex-col active:scale-[0.98] transition-all"
            >
              <div className="h-24 w-full relative overflow-hidden">
                <img 
                  src={offer.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={offer.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-900 shadow-sm">
                   <ShoppingBag size={12} />
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[12px] font-black text-slate-900 mb-1 leading-tight">{offer.title}</h3>
                  <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 font-medium">{offer.desc}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[10px] font-black text-primary uppercase">{offer.price}</p>
                  <ArrowRight className="text-slate-900 group-hover:translate-x-1 transition-transform" size={12} strokeWidth={3} />
                </div>
              </div>
            </motion.div>
          ))}
          <div className="w-2 shrink-0"></div>
        </div>
      </section>

      {/* Featured Background Offer Card */}
      <section className="px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-[180px] rounded-[36px] overflow-hidden shadow-card-float cursor-pointer group active:scale-[0.98] transition-all"
          onClick={() => alert('Programa de indicação iniciado!')}
        >
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Indicação premiada"
          />
          
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent"></div>
          
          {/* Content Over Background */}
          <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary px-3 py-1 rounded-full">
                <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Especial</p>
              </div>
              <Gift className="text-primary" size={14} />
            </div>
            
            <h3 className="text-xl font-black text-white leading-tight mb-2 max-w-[160px]">
              Indique e Ganhe Créditos
            </h3>
            <p className="text-slate-300 text-[11px] font-medium leading-relaxed max-w-[180px] mb-4">
              Cada amigo instalado vale 1 mês de créditos gratuitos para você.
            </p>
            
            <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg active:scale-95 transition-all">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">Indicar Agora</span>
              <Users size={14} className="text-slate-900" strokeWidth={2.5} />
            </button>
          </div>
          
          {/* Subtle Shine Effect */}
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000"></div>
        </motion.div>
      </section>

      <AIInsightCard />

      {activeModal && (
        <DetailModal 
          isOpen={true} 
          onClose={() => setActiveModal(null)}
          title={activeModal.title}
          icon={activeModal.icon}
        >
          {renderModalContent()}
        </DetailModal>
      )}
    </motion.div>
  );
};

export default Dashboard;
