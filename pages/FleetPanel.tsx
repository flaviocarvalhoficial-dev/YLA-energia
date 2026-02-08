
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from '../components/AnimatedNumber.tsx';

const FleetPanel: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32 px-6 pt-12"
    >
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-white/5">
             <img src="https://picsum.photos/seed/admin/100/100" className="w-full h-full object-cover" alt="Admin" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-normal uppercase tracking-wider">Gestor YLA</p>
            <h1 className="text-lg font-bold">Painel de Frota</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-card-dark flex items-center justify-center border border-white/5">
            <span className="material-icons-outlined text-xl">search</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-card-dark flex items-center justify-center relative border border-white/5">
            <span className="material-icons-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-2 bg-primary p-6 rounded-[20px] text-black shadow-xl shadow-primary/20 border border-white/5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-normal uppercase tracking-widest opacity-60">Total de Clientes</p>
              <h2 className="text-4xl font-black mt-2">
                <AnimatedNumber value={1284} />
              </h2>
            </div>
            <span className="material-icons-outlined opacity-30 text-4xl">group</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[10px] font-normal uppercase tracking-widest">
            <span className="material-icons-outlined text-sm">trending_up</span>
            <span>+12% este mês</span>
          </div>
        </div>

        <div className="bg-card-dark p-5 rounded-[20px] border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <p className="text-[10px] font-normal uppercase tracking-widest text-slate-500">Em Risco</p>
          </div>
          <h3 className="text-2xl font-black">42</h3>
          <p className="text-[10px] mt-1 text-slate-600 font-normal uppercase">Sistemas</p>
        </div>

        <div className="bg-card-dark p-5 rounded-[20px] border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <p className="text-[10px] font-normal uppercase tracking-widest text-slate-500">Estáveis</p>
          </div>
          <h3 className="text-2xl font-black">1.242</h3>
          <p className="text-[10px] mt-1 text-slate-600 font-normal uppercase">Sistemas</p>
        </div>
      </section>

      <section className="bg-card-dark p-6 rounded-[20px] mb-8 border border-white/5 shadow-lg">
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-normal text-[10px] uppercase tracking-widest text-slate-500">Monitoramento Ativo</h3>
          <button className="text-primary text-[10px] font-normal uppercase tracking-widest">Ver Todos</button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Residencial Silva', id: 'YLA-4429', power: '4.2 kW', status: 'ativo' },
            { name: 'Condomínio Solar', id: 'YLA-8812', power: '0.8 kW', status: 'alerta' },
            { name: 'Fazenda Santa Luzia', id: 'YLA-1102', power: '12.5 kW', status: 'ativo' },
          ].map((client) => (
            <div key={client.id} className={`bg-surface-dark p-4 rounded-[20px] border border-white/5 flex items-center justify-between transition-all active:scale-[0.98] ${client.status === 'alerta' ? 'border-l-4 border-l-orange-500' : ''}`}>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-[20px] bg-card-dark flex items-center justify-center">
                    <span className={`material-icons-outlined ${client.status === 'alerta' ? 'text-orange-500' : 'text-slate-500'}`}>
                      {client.status === 'alerta' ? 'warning' : 'solar_power'}
                    </span>
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-slate-200">{client.name}</h4>
                   <p className="text-[10px] text-slate-600 font-normal uppercase">ID: {client.id}</p>
                 </div>
               </div>
               <div className="text-right">
                 <div className="flex items-center gap-1 justify-end">
                    <div className={`w-1.5 h-1.5 rounded-full ${client.status === 'alerta' ? 'bg-orange-500' : 'bg-primary'}`}></div>
                    <span className={`text-[9px] font-normal uppercase tracking-tighter ${client.status === 'alerta' ? 'text-orange-500' : 'text-primary'}`}>
                      {client.status === 'alerta' ? 'Alerta' : 'Ativo'}
                    </span>
                 </div>
                 <p className="text-[16px] font-black mt-1">{client.power}</p>
               </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default FleetPanel;
