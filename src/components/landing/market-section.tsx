'use client';

import { Globe2, BarChart3, Landmark } from 'lucide-react';

const marketItems = [
  {
    title: 'TAM',
    value: '$700B+',
    desc: 'Total addressable market untuk infrastruktur air global',
  },
  {
    title: 'SAM',
    value: '$120B',
    desc: 'Segmen yang dapat diservis: pembiayaan dan operasi sumur air',
  },
  {
    title: 'SOM',
    value: '$2.4B',
    desc: 'Pangsa awal target 24 bulan melalui kemitraan strategis',
  },
];

export function MarketSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe2 className="h-4 w-4" /> Market Size
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Massive, Under-Served Market
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Air adalah aset paling vital. Kebutuhan infrastruktur dan efisiensi menciptakan peluang pertumbuhan yang sangat besar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {marketItems.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{m.value}</div>
              <div className="font-semibold text-slate-900 mb-2">{m.title}</div>
              <p className="text-slate-600">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" /> Go-to-Market
          </h3>
          <ul className="grid md:grid-cols-3 gap-4 text-slate-700">
            <li className="flex items-start"><span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" /> Kemitraan operator air di Afrika dan Asia</li>
            <li className="flex items-start"><span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" /> Program investor institusi: impact dan frontier markets</li>
            <li className="flex items-start"><span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" /> Distribusi retail terkurasi via wallet & exchange</li>
          </ul>
        </div>
      </div>
    </section>
  );
}