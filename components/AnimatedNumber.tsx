
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  // Configuração de spring mais "viva"
  const spring = useSpring(0, { 
    mass: 1, 
    stiffness: 80, 
    damping: 12,
    restDelta: 0.001 
  });
  
  const displayValue = useTransform(spring, (current) => 
    `${prefix}${current.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className="tabular-nums">{displayValue}</motion.span>;
};

export default AnimatedNumber;
