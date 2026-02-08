
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Lightbulb, TrendingDown, Scale, CheckCircle2, ArrowUpRight } from 'lucide-react';
import AnimatedNumber from '../components/AnimatedNumber.tsx';

// --- CONFIGURAÇÃO DE DADOS ---
const CONSUMPTION_DATA = {
  projectCapacity: 340,
  sunProduction: 310,
  userSpent: 410,
  feeLimit: 550, 
};

// --- DEFINIÇÃO DAS FAIXAS (PATAMARES) ---
const TARIFF_TIERS = [
  { id: 1, range: '0 - 200', name: 'Econômico', fee: 18.50, color: '#92E32B', bg: 'bg-primary/10', text: 'text-primary' },
  { id: 2, range: '201 - 350', name: 'Padrão', fee: 24.90, color: '#3B82F6', bg: 'bg-blue-50', text: 'text-blue-500' },
  { id: 3, range: '351 - 442', name: 'Alerta', fee: 42.00, color: '#FF6B00', bg: 'bg-orange-50', text: 'text-[#FF6B00]' },
  { id: 4, range: '443+', name: 'Crítico', fee: 68.40, color: '#EF4444', bg: 'bg-red-50', text: 'text-red-500' },
];

const getTariffLevel = (spent: number) => {
  if (spent <= 200) return TARIFF_TIERS[0];
  if (spent <= 350) return TARIFF_TIERS[1];
  if (spent <= 442) return TARIFF_TIERS[2];
  return TARIFF_TIERS[3];
};

const Consumption: React.FC = () => {
  const navigate = useNavigate();
  const currentTier = getTariffLevel(CONSUMPTION_DATA.userSpent);
  const percentOfCapacity = (CONSUMPTION_DATA.userSpent / CONSUMPTION_DATA.projectCapacity) * 100;
  
  // Parâmetros do Arco - Ajustados para não tocar o número
  const arcRadius = 82;
  const arcLength = Math.PI * arcRadius;
  const progress = Math.min(CONSUMPTION_DATA.userSpent / CONSUMPTION_DATA.feeLimit, 1);
  const offset = arcLength - (progress * arcLength);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-44 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] bg-[#F8FAFC] min-h-screen font-sans selection:bg-primary/30"
    >
      <header className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 border border-slate-100 shadow-sm active:scale-90 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Resumo de Consumo</span>
        <div className="w-10" />
      </header>

      {/* 1. GAUGE REFINADO - ESPAÇAMENTO CORRIGIDO */}
      <section className="bg-white p-8 rounded-[44px] border border-slate-50 shadow-soft mb-6 relative overflow-hidden text-center">
        <div className="absolute top-6 right-8 text-slate-100">
           <Info size={16} />
        </div>

        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mb-6">Uso da Rede Elétrica</p>
        
        <div className="relative flex justify-center items-center mb-6 pt-4">
          <svg width="240" height="130" viewBox="0 0 200 110" className="overflow-visible">
            {/* Trilho do Arco (Fundo) */}
            <path 
              d="M 18 100 A 82 82 0 0 1 182 100" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="12" 
              strokeLinecap="round" 
            />
            {/* Preenchimento Dinâmico */}
            <motion.path
              initial={{ strokeDashoffset: arcLength }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 2.2, ease: [0.34, 1.56, 0.64, 1] }}
              d="M 18 100 A 82 82 0 0 1 182 100"
              fill="none"
              stroke={currentTier.color}
              strokeWidth="12"
              strokeDasharray={arcLength}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 4px 10px ${currentTier.color}25)` }}
            />
          </svg>
          
          {/* Container do Número - Ajustado para 'top-[62px]' para não tocar o arco */}
          <div className="absolute top-[62px] w-full flex flex-col items-center">
             <div className="flex items-baseline gap-1">
               <h2 className="text-[52px] font-black text-slate-900 tracking-[-0.04em] leading-none">
                 <AnimatedNumber value={CONSUMPTION_DATA.userSpent} />
               </h2>
               <span className="text-slate-200 font-bold text-lg uppercase tracking-tighter">kWh</span>
             </div>
             <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
               <div className={`w-1.5 h-1.5 rounded-full ${currentTier.bg.replace('/10', '')} animate-pulse`} />
               <span className={`text-[9px] font-extrabold tracking-widest uppercase ${currentTier.text}`}>
                 Status {currentTier.name}
               </span>
             </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-medium mt-4">
          Seu consumo está <span className="text-slate-900 font-bold">{percentOfCapacity.toFixed(0)}%</span> do planejado
        </p>
      </section>

      {/* 2. QUADRO DE PATAMARES - DESIGN SOFT */}
      <section className="bg-white p-7 rounded-[36px] border border-slate-50 shadow-soft mb-6">
        <div className="flex items-center justify-between mb-8 px-1">
          <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2">
            <Scale size={14} className="text-primary opacity-50" /> Tabela de Patamares
          </h3>
          <span className="text-[9px] font-bold text-slate-200 uppercase tracking-widest">CIP 2024</span>
        </div>

        <div className="flex flex-col-reverse gap-4">
          {TARIFF_TIERS.map((tier) => {
            const isActive = tier.id === currentTier.id;
            return (
              <motion.div 
                key={tier.id}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center justify-between p-5 rounded-[28px] border transition-all duration-500 ${
                  isActive 
                    ? 'border-primary/20 bg-primary/5 shadow-lg shadow-primary/[0.03] ring-4 ring-primary/[0.02]' 
                    : 'border-transparent bg-slate-50/50 opacity-40 grayscale-[0.8]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[20px] flex items-center justify-center ${tier.bg} ${tier.text} shadow-inner`}>
                    {isActive ? (
                      <CheckCircle2 size={24} strokeWidth={2.5} />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mb-1">Patamar {tier.id}</p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[16px] font-extrabold text-slate-900">{tier.name}</p>
                      <span className="text-[10px] text-slate-300 font-medium">({tier.range} kWh)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline gap-0.5 justify-end">
                    <span className="text-[10px] font-bold text-slate-400">R$</span>
                    <p className={`text-[20px] font-black leading-none ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>
                      {tier.fee.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  {isActive && (
                    <p className="text-[8px] font-bold text-primary uppercase tracking-[0.15em] mt-1 text-right">Você está aqui</p>
                  )}
                </div>
                
                {isActive && (
                  <motion.div 
                    layoutId="softIndicator"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 bg-primary rounded-full shadow-[0_0_12px_rgba(146,227,43,0.3)]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. MÓDULO FINANCEIRO - DARK SOFT */}
      <section className="bg-[#0F172A] p-8 rounded-[40px] text-white relative overflow-hidden mb-6 shadow-xl">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/10 rounded-full blur-[80px] opacity-40"></div>
        
        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/[0.05]">
            <Lightbulb className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.25em] mb-1">Iluminação Pública (CIP)</p>
            <p className="text-[11px] text-white/30 font-medium">Estimativa baseada no consumo atual</p>
          </div>
        </div>
        
        <div className="flex justify-between items-end relative z-10">
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white/50">R$</span>
              <h3 className="text-[52px] font-black text-white tracking-tighter leading-none">
                <AnimatedNumber value={currentTier.fee} decimals={2} />
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-4">
               <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
               <p className="text-[9px] text-primary/80 font-bold uppercase tracking-[0.1em]">Cálculo em Tempo Real</p>
            </div>
          </div>
          
          <div className="text-right border-l border-white/[0.08] pl-6 mb-1">
            <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mb-2">Total na Fatura</p>
            <p className="text-[18px] font-black text-slate-100 tracking-tight">R$ {(currentTier.fee + 45.30).toFixed(2).replace('.', ',')}</p>
          </div>
        </div>
      </section>

      {/* 4. MÓDULO DE INSIGHT */}
      <section className="bg-white p-6 rounded-[32px] border border-slate-50 flex items-center gap-5 shadow-soft">
        <div className="w-14 h-14 bg-slate-50 rounded-[24px] flex items-center justify-center text-primary shadow-inner shrink-0">
          <TrendingDown size={28} />
        </div>
        <div className="flex-1">
          <h4 className="text-[12px] font-bold text-slate-900 mb-1">Sugestão de Economia</h4>
          <p className="text-[10px] text-slate-400 leading-[1.6] font-medium">
            {currentTier.id > 2 ? (
              <>Seu gasto é de <span className="text-slate-900 font-bold">{CONSUMPTION_DATA.userSpent}kWh</span>. Se baixar <span className="text-orange-500 font-bold">{CONSUMPTION_DATA.userSpent - 350}kWh</span> você retorna ao patamar <span className="text-primary font-bold">Padrão</span>.</>
            ) : (
              <>Você está em uma faixa de consumo excelente. Mantenha abaixo de 350kWh para garantir a menor taxa da CIP.</>
            )}
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default Consumption;
