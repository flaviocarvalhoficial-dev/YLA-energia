
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronLeft, Share2, Grid, Settings, Calendar, ShieldCheck, TreePine, CloudRain, Info } from 'lucide-react';
import AnimatedNumber from '../components/AnimatedNumber.tsx';

const data = [
  { time: '08:00', generation: 1.5 },
  { time: '10:00', generation: 3.8 },
  { time: '12:00', generation: 5.2 },
  { time: '14:00', generation: 4.9 },
  { time: '16:00', generation: 2.1 },
  { time: '18:00', generation: 0.8 },
];

const SystemDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32 min-h-screen bg-background-light"
    >
      <header className="p-6 flex items-center justify-between sticky top-0 bg-background-light/90 backdrop-blur-xl z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full shadow-sm text-slate-400 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Detalhes do Sistema</h1>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full shadow-sm text-slate-400">
          <Share2 size={18} />
        </button>
      </header>

      <div className="px-6 space-y-10 mt-4">
        {/* Top Section: Real-time Generation */}
        <section className="relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Geração Atual</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-6xl font-black text-slate-900 tracking-tight">
                  <AnimatedNumber value={4.82} decimals={2} />
                </h2>
                <span className="text-slate-300 font-black text-2xl">kW</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(146,227,43,0.8)]"></div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Tempo Real</span>
            </div>
          </div>

          <div className="h-44 w-full -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#92E32B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#92E32B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="generation" 
                  stroke="#92E32B" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorGen)" 
                  animationDuration={2000}
                />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
                  dy={10}
                />
                <Tooltip 
                  cursor={{ stroke: '#92E32B', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '16px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    padding: '8px 12px'
                  }}
                  itemStyle={{ color: '#0F172A', fontWeight: '800', fontSize: '12px' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Technical Specifications */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1 bg-slate-100"></div>
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-2 whitespace-nowrap">Especificações Técnicas</h3>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-2">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Grid size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Módulos</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">12x Jinko 450W</p>
              </div>
            </div>

            <div className="space-y-3 text-right flex flex-col items-end">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Settings size={20} strokeWidth={2.5} />
              </div>
              <div className="w-full">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Inversor</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Growatt 5000-S</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Calendar size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Instalação</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Março de 2023</p>
              </div>
            </div>

            <div className="space-y-3 text-right flex flex-col items-end">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              <div className="w-full">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Garantia</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Até 2035</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-[#f2f9eb] p-8 rounded-[40px] border border-primary/5 shadow-sm">
          <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-8 text-center">Impacto Ambiental Acumulado</h3>
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-primary rounded-[22px] flex items-center justify-center text-slate-900 shadow-lg shadow-primary/20">
                <TreePine size={26} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Árvores Preservadas</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-slate-900">42</p>
                  <p className="text-[12px] font-bold text-slate-400">unidades</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-orange-500 rounded-[22px] flex items-center justify-center text-white shadow-lg shadow-orange-200">
                <CloudRain size={26} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Carbono Evitado</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-slate-900">1.8</p>
                  <p className="text-[12px] font-bold text-slate-400">Toneladas</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-primary/10 flex items-center justify-center gap-2 text-slate-400">
            <Info size={14} />
            <span className="text-[10px] font-medium uppercase tracking-widest">Dados atualizados a cada 15 min</span>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default SystemDetail;
