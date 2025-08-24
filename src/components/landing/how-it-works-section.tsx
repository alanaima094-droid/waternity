'use client';

import {
  Wallet,
  Gauge,
  Settings,
  ArrowRightLeft,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

const steps = [
  {
    icon: <Wallet className="h-8 w-8" />,
    title: 'Deposit (HTS)',
    desc: 'User deposit via Hedera Token Service untuk akses air',
    tech: 'HTS Token Transfer',
    step: '01',
  },
  {
    icon: <Gauge className="h-8 w-8" />,
    title: 'Meter Liter Keluar',
    desc: 'IoT sensor log setiap 10L ke Hedera Consensus Service',
    tech: 'HCS Event Log',
    step: '02',
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: 'Tariff v1→v2 Update',
    desc: 'Dynamic pricing update via HCS untuk real-time adjustment',
    tech: 'HCS State Update',
    step: '03',
  },
  {
    icon: <ArrowRightLeft className="h-8 w-8" />,
    title: 'Settlement Split + Refund',
    desc: 'Otomatis split revenue ke investor dan refund ke user via HTS',
    tech: 'HTS Multi-Transfer',
    step: '04',
  },
  {
    icon: <FileCheck className="h-8 w-8" />,
    title: 'Claim + Audit',
    desc: 'Semua transaksi dapat di-audit via HTS/HCS proofs di HashScan',
    tech: 'Public Verification',
    step: '05',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            5 langkah sederhana dengan Hedera blockchain untuk transparansi
            penuh dari deposit hingga audit. Setiap aksi = proof yang dapat
            diverifikasi.
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-4 mx-auto shadow-lg">
                    {step.icon}
                  </div>
                  <div className="text-sm font-bold text-blue-600 mb-1">
                    STEP {step.step}
                  </div>
                  <div className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </div>
                  <div className="text-sm text-slate-600 max-w-48">
                    {step.desc}
                  </div>
                  <div className="text-xs text-blue-500 font-medium mt-2 bg-blue-50 px-3 py-1 rounded-full">
                    {step.tech}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-slate-400 mx-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-blue-600 mb-1">
                    STEP {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 mb-3">{step.desc}</p>
                  <div className="text-xs text-blue-500 font-medium bg-blue-50 px-3 py-1 rounded-full inline-block">
                    {step.tech}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proof Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Every Action = Hedera Proof
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Semua transaksi tercatat di Hedera ledger dan dapat diverifikasi
              publik. Klik link HashScan untuk audit real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://hashscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                View on HashScan
              </a>
              <a
                href="https://mainnet.mirrornode.hedera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Hedera Mirror API
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
