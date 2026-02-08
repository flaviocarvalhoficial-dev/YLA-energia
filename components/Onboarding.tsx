
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, TrendingUp, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "Sua usina na palma da mão",
    description: "Acompanhe a geração de energia do seu sistema em tempo real, de qualquer lugar do mundo.",
    icon: Sun,
    color: "bg-primary",
    iconColor: "text-slate-900"
  },
  {
    title: "Economia que faz a diferença",
    description: "Visualize seus créditos acumulados e veja quanto você está poupando mês a mês.",
    icon: TrendingUp,
    color: "bg-slate-900",
    iconColor: "text-primary"
  },
  {
    title: "Insights com Inteligência",
    description: "Nossa IA analisa seu consumo e sugere as melhores formas de otimizar sua eficiência.",
    icon: Sparkles,
    color: "bg-primary",
    iconColor: "text-slate-900"
  },
  {
    title: "Tudo sob controle",
    description: "Solicite manutenções, adquira novos produtos e receba alertas importantes instantaneamente.",
    icon: ShieldCheck,
    color: "bg-slate-900",
    iconColor: "text-primary"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-[200] bg-background-light flex flex-col">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full flex flex-col items-center"
          >
            <div className={`w-24 h-24 ${steps[currentStep].color} rounded-[32px] flex items-center justify-center mb-10 shadow-2xl shadow-primary/20`}>
              <StepIcon className={steps[currentStep].iconColor} size={40} strokeWidth={2.5} />
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
              {steps[currentStep].title}
            </h2>
            
            <p className="text-slate-500 text-base font-medium leading-relaxed max-w-[280px]">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-10 pb-16 flex flex-col items-center">
        {/* Progress Dots */}
        <div className="flex gap-2 mb-10">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                width: i === currentStep ? 24 : 8,
                backgroundColor: i === currentStep ? "#92E32B" : "#E2E8F0"
              }}
              className="h-2 rounded-full transition-all duration-300"
            />
          ))}
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={nextStep}
            className="w-full bg-slate-900 text-white py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-slate-200"
          >
            {currentStep === steps.length - 1 ? "Começar Agora" : "Próximo"}
            <ArrowRight size={18} strokeWidth={3} />
          </button>
          
          <button
            onClick={onComplete}
            className="w-full py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            Pular Introdução
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
