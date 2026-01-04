import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, trend, delay = 0, icon }) => {
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-gray-400';
  
  return (
    <div 
      className="group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/10 overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {icon && (
        <div className="absolute top-4 right-4 text-xl opacity-90 group-hover:opacity-100 transition-all duration-500 cursor-default select-none transform group-hover:scale-110">
          {icon}
        </div>
      )}
      
      <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium z-10">{label}</span>
      <div className="flex items-baseline gap-2 z-10">
        <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">{value}</span>
        {subValue && (
          <span className={`text-sm font-medium ${trendColor}`}>
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};