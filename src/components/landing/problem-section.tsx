'use client';

import { AlertTriangle, Clock, Gauge, DollarSign, TrendingDown, X } from 'lucide-react';

interface ProblemStat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  trend: 'negative' | 'warning';
}

const problemStats: ProblemStat[] = [
  {
    icon: <AlertTriangle className="h-8 w-8" />,
    value: '400M',
    label: 'Access Gap',
    description: '400M Sub-Sahara tanpa air; 2.2B global unserved',
    trend: 'negative',
  },
  {
    icon: <TrendingDown className="h-8 w-8" />,
    value: '30-50%',
    label: 'Leakage',
    description: 'Cash kiosk revenue bocor 30–50%',
    trend: 'negative',
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    value: '$131-140B/yr',
    label: 'Funding Gap',
    description: '$131–$140B/yr untuk SDG6 water infra',
    trend: 'warning',
  },
];

const painPoints = [
  {
    title: 'Massive Investment Gap',
    description: 'Traditional funding mechanisms fail to scale water infrastructure projects globally',
    impact: '$114B annual funding shortfall',
  },
  {
    title: 'Lack of Transparency',
    description: 'Investors cannot track impact or ensure funds reach intended communities',
    impact: '85% of donors want proof of impact',
  },
  {
    title: 'Inefficient Operations',
    description: 'Existing water projects lack real-time monitoring and optimization',
    impact: '40% operational efficiency loss',
  },
  {
    title: 'Limited Scalability',
    description: 'Current models cannot expand quickly enough to meet urgent global needs',
    impact: '2030 SDG targets at risk',
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="h-4 w-4" />
            URGENT GLOBAL CRISIS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            The Water Crisis is
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              An Investment Crisis
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            While 2 billion people lack access to safe water, traditional funding mechanisms are failing. 
            The water sector needs a new investment model that delivers both impact and returns.
          </p>
        </div>

        {/* Problem Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problemStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                stat.trend === 'negative' 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-orange-100 text-orange-600'
              }`}>
                {stat.icon}
              </div>
              
              <div className={`text-4xl font-bold mb-2 ${
                stat.trend === 'negative' 
                  ? 'text-red-600' 
                  : 'text-orange-600'
              }`}>
                {stat.value}
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {stat.label}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pain Points */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Why Traditional Funding Fails
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The water crisis persists because current investment models are fundamentally broken. 
              Here's what investors and communities face today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    {point.impact}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {point.title}
                </h4>

                <p className="text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              The Time for Change is Now
            </h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              Every day of delay means more communities without water and more missed opportunities for investors. 
              We need a new model that works for everyone.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium">
              <TrendingDown className="h-5 w-5" />
              <span>$260B Lost Annually</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}