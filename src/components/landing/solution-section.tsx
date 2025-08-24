'use client';

import {
  ShieldCheck,
  ChartLine,
  Workflow,
  Lock,
  BadgeCheck,
} from 'lucide-react';

interface SolutionItem {
  title: string;
  description: string;
  highlights: string[];
}

const solutions: SolutionItem[] = [
  {
    title: 'Existing Wells',
    description:
      'Deposit-first, IoT liter logs (HCS), auto-settlement split (HTS).',
    highlights: [
      'Deposit awal untuk akses air',
      'IoT sensor mencatat setiap liter keluar',
      'HCS logs untuk audit transparan',
      'HTS auto-settlement untuk bagi hasil',
      'Real-time revenue tracking',
    ],
  },
  {
    title: 'New Wells',
    description:
      'Well NFT + Capex escrow, fund drilling → setelah operational → yield.',
    highlights: [
      'Well NFT sebagai proof of ownership',
      'Capex escrow untuk funding drilling',
      'Fund drilling sampai operational',
      'Yield generation setelah operational',
      'NFT tradeable untuk liquidity',
    ],
  },
];

export function SolutionSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            The Solution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Dual Mode Solution
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Existing & New Wells
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Dua model bisnis yang saling melengkapi: monetisasi sumur existing
            dan funding untuk sumur baru dengan Hedera blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
            >
              <div className="w-14 h-14 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-6">
                <BadgeCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-slate-600"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <ChartLine className="h-5 w-5 text-green-600" /> ROI Terkait
              Kinerja
            </h4>
            <p className="text-sm text-slate-600">
              Return investor ditautkan ke output air bersih, menghilangkan
              asimetri informasi.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Workflow className="h-5 w-5 text-green-600" /> Otomasi Pembayaran
            </h4>
            <p className="text-sm text-slate-600">
              Distribusi hasil via HTS; pembagian otomatis berdasarkan
              persentase kepemilikan token.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-600" /> Audit Real-time
            </h4>
            <p className="text-sm text-slate-600">
              Semua peristiwa operasional dipublish ke HCS, dapat diaudit kapan
              saja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
