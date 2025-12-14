'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'safe' | 'warning' | 'danger';
  trend?: string;
  subtitle?: string;
}

const colorClasses = {
  primary: 'from-primary/20 to-primary/5 border-primary/30',
  secondary: 'from-secondary/20 to-secondary/5 border-secondary/30',
  accent: 'from-accent/20 to-accent/5 border-accent/30',
  safe: 'from-green-500/20 to-green-500/5 border-green-500/30',
  warning: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
  danger: 'from-red-500/20 to-red-500/5 border-red-500/30',
};

const iconColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  safe: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
};

export default function StatsCard({
  title,
  value,
  icon,
  color,
  trend,
  subtitle,
}: StatsCardProps) {
  const isPositive = trend?.startsWith('+');

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative overflow-hidden rounded-2xl bg-gradien-to-br ${colorClasses[color]} border backdrop-blur-sm p-6`}
    >
      {/* Animated Background */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/5 blur-xl" />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 ${iconColors[color]}`}>
          {icon}
        </div>
      </div>

      {/* Trend & Subtitle */}
      <div className="flex items-center justify-between">
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{trend}</span>
          </div>
        )}
        
        {subtitle && (
          <p className="text-sm text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Progress Bar Animation */}
      {trend && (
        <div className="mt-4">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isPositive ? '75%' : '30%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full rounded-full ${
                isPositive ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}