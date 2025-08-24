'use client';

import { Cpu, Gauge, Activity, Layers, Boxes, Workflow } from 'lucide-react';

const productFeatures = [
  {
    icon: <Layers className="h-8 w-8" />,
    title: 'Landing Page (SSR)',
    desc: 'Server-side rendered untuk SEO optimal dan loading cepat',
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: 'Dashboard (SPA 6 Tab)',
    desc: 'Single Page App dengan 6 tab: Explore, User, Operator, Investor, Audit, Admin',
  },
  {
    icon: <Gauge className="h-8 w-8" />,
    title: 'Demo ≤ 170s',
    desc: 'Complete demo walkthrough dalam waktu kurang dari 3 menit',
  },
  {
    icon: <Boxes className="h-8 w-8" />,
    title: '9 Cards Live Wells',
    desc: '9 kartu sumur aktif dengan data real-time dan proof clickable',
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    title: 'Hedera Proof Integration',
    desc: 'Every action = Hedera proof (HTS tx / HCS id) untuk full transparency',
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    title: 'Proof Clickable',
    desc: 'Semua proof dapat diklik untuk verifikasi langsung ke Hedera network',
  },
];

export function ProductSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Product Overview
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            2 halaman: Landing (SSR) + Dashboard (SPA 6 tab). Every action =
            Hedera proof (HTS tx / HCS id). Demo ≤ 170s, 9 cards live wells,
            proof clickable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productFeatures.map((f, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {f.title}
              </h3>
              <p className="text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
