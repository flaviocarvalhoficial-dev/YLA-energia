
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts';
import { ChevronLeft, Calendar, Activity, Zap, Leaf, Receipt, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedNumber from '../components/AnimatedNumber.tsx';

const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Diário');

  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Fev', value: 600 },
    { name: 'Mar', value: 300 },
    { name: 'Abr', value: 900 },
    { name: 'Mai', value: 500 },
    { name: 'Jun', value: 700 },
  ];

  const statsItems = [
    { 
      icon: Zap, 
      label: 'Energia', 
      value: 840, 
      unit: 'kWh', 
      description: 'Energia suficiente para sua casa por 28 dias.' 
    },
    { 
      icon: Leaf, 
      label: 'CO2 Salvo', 
      value: 12.5, 
      unit: 'kg', 
      description: 'O equivalente a ter plantado 2 árvores hoje.' 
    },
    { 
      icon: Receipt, 
      label: 'Economia', 
      value: 724, 
      unit: '', 
      prefix: 'R$ ', 
      description: 'Valor que será descontado da sua próxima conta.' 
    },
    { 
      icon: TrendingUp, 
      label: 'Eficiência', 
      value: 98.2, 
      unit: '%', 
      description: 'Seus painéis estão operando em potência máxima.' 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32 px-6 pt-12 bg-background-light min-h-screen"
    >
      <header className="flex justify-between items-center mb-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 border border-slate-100 shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-slate-900 uppercase tracking-widest">Análise</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 border border-slate-100 shadow-sm">
          <Calendar size={18} />
        </button>
      </header>

      <div className="flex bg-slate-200/40 p-1.5 rounded-[20px] mb-8 border border-white/50">
        {['Diário', 'Semanal', 'Mensal'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-3 rounded-[16px] font-normal text-[9px] uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-white text-slate-900 shadow-md font-bold' : 'text-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="bg-white p-8 rounded-[30px] mb-8 shadow-card-float relative overflow-hidden border border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <span className="text-slate-400 text-[9px] font-normal uppercase tracking-widest">Geração Total</span>
          <div className="w-9 h-9 bg-primary/10 rounded-[14px] flex items-center justify-center">
            <Activity className="text-primary" size={18} />
          </div>
        </div>
        <div className="flex items-baseline space-x-1.5 mb-8">
          <h2 className="text-5xl font-black tracking-tight text-slate-900">
            <AnimatedNumber value={1245.80} decimals={1} />
          </h2>
          <span className="text-base font-bold text-slate-300">kWh</span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar 
                dataKey="value" 
                radius={[6, 6, 6, 6]}
                animationDuration={1500}
                animationBegin={300}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.name === 'Abr' ? '#92E32B' : '#F1F5F9'} 
                    fillOpacity={1}
                  />
                ))}
              </Bar>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 9, fontWeight: 400 }} 
                dy={10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        {statsItems.map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1), type: "spring", stiffness: 100 }}
            className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <item.icon className="text-primary" size={20} strokeWidth={2.5} />
              </div>
              <p className="text-[8px] text-slate-900 font-normal uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-lg font-black text-slate-900 leading-none">
                <AnimatedNumber value={item.value} decimals={1} prefix={item.prefix} /> 
                <span className="text-[9px] font-normal opacity-30 ml-1 uppercase">{item.unit}</span>
              </p>
            </div>
            <p className="text-[10px] text-slate-400 font-normal leading-tight mt-3">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Statistics;
