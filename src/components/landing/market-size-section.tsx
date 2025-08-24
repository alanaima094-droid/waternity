'use client';

import { TrendingUp, DollarSign, Target, Globe } from 'lucide-react';

interface MarketTier {
  kios: string;
  revenue: string;
  description: string;
  icon: React.ReactNode;
}

const marketTiers: MarketTier[] = [
  {
    kios: '10k kios',
    revenue: '$80.3M/yr',
    description: 'Regional pilot scale',
    icon: <Target className="h-6 w-6" />,
  },
  {
    kios: '100k kios',
    revenue: '$803M/yr',
    description: 'National deployment',
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    kios: '1M kios',
    revenue: '$8.03B/yr',
    description: 'Multi-country scale',
    icon: <Globe className="h-6 w-6" />,
  },
];

export function MarketSizeSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <DollarSign className="h-4 w-4" />
            Market Opportunity
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Market Size
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Scalable Revenue Model
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Revenue potential yang dapat diskalakan dari 10k hingga 1M kios dengan model bisnis yang terbukti.
          </p>
        </div>

        {/* Market Size Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white">Revenue Projection by Scale</h3>
          </div>
          
          <div className="divide-y divide-slate-200">
            {marketTiers.map((tier, index) => (
              <div key={index} className="px-8 py-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      {tier.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{tier.kios}</h4>
                      <p className="text-slate-600">{tier.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {tier.revenue}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Infrastructure Gap */}
            <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Infra Gap (New Wells)</h4>
                    <p className="text-slate-600">Global infrastructure funding requirement</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    $131–$140B/yr
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <Target className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Scalable Model</h3>
            <p className="text-slate-600">
              Revenue model yang dapat diskalakan dari regional hingga global dengan infrastruktur yang sama.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
              <TrendingUp className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Growth Potential</h3>
            <p className="text-slate-600">
              Dari $80M hingga $8B revenue potential dengan ekspansi geografis dan peningkatan adoption.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="w-14 h-14 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
              <Globe className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Global Impact</h3>
            <p className="text-slate-600">
              Addressing $131-140B annual funding gap untuk SDG6 water infrastructure globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}