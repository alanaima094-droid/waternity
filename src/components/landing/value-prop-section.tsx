'use client';

import { Percent, ShieldCheck, Timer, NotepadText } from 'lucide-react';

const values = [
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: 'Operator',
    desc: 'Revenue transparan, fraud 0% dengan HCS logs dan HTS settlement otomatis',
  },
  {
    icon: <Percent className="h-7 w-7" />,
    title: 'Investor',
    desc: '25% rev share yield real-time, dibayar otomatis via HTS setiap settlement',
  },
  {
    icon: <Timer className="h-7 w-7" />,
    title: 'User',
    desc: 'Harga adil berdasarkan usage, refund deposit otomatis saat selesai',
  },
  {
    icon: <NotepadText className="h-7 w-7" />,
    title: 'Auditor',
    desc: 'Semua link public verifiable di Hedera Mirror dan HashScan untuk compliance',
  },
];

export function ValuePropSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Value Proposition
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Waternity menyatukan hasil finansial, dampak nyata, dan transparansi
            level-audit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <div className="font-semibold text-slate-900 mb-1">{v.title}</div>
              <div className="text-slate-600">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
