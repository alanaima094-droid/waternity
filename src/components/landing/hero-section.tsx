'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Droplets, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';

interface HeroHook {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const heroHooks: HeroHook[] = [
  {
    icon: <Droplets className="h-8 w-8 text-blue-500" />,
    title: 'Water Sustainability',
    description:
      'Invest in verified water conservation projects with real environmental impact',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
    title: 'Profitable Returns',
    description:
      'Earn competitive returns while contributing to global water security',
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: 'Blockchain Verified',
    description:
      'Every investment and impact metric is transparently recorded on Hedera',
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300A5FF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Hero Content */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Unlock $803M/yr to Hedera
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              100k Kios,
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Click-to-Audit Cashflows
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-6 max-w-4xl mx-auto leading-relaxed">
             100k kios @ 2.2k L/day = $2.2M/day; HCS logs liters, HTS splits revenue, NFT funds new wells for drylands.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-blue-800 mb-2">Proof-of-Impact:</p>
              <p className="text-blue-700">Every 10 Liters = HCS Event = Audited Revenue</p>
            </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/dashboard">
                Open Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              <Link href="https://hashscan.io" target="_blank">View Ledger (Proofs)</Link>
            </Button>
          </div>
          
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 max-w-3xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">HCS Today: 3,250 deltas</span>
                <Link href="https://mirror.hedera.com" target="_blank" className="text-blue-600 hover:text-blue-800 underline">
                  Open in Mirror
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Last Settlement: 0x8f…a3c</span>
                <Link href="https://hashscan.io" target="_blank" className="text-blue-600 hover:text-blue-800 underline">
                  Open in HashScan
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Hooks */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {heroHooks.map((hook, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{hook.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {hook.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {hook.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">
            Trusted by investors worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-slate-400">Hedera</div>
            <div className="text-2xl font-bold text-slate-400">Verified</div>
            <div className="text-2xl font-bold text-slate-400">Sustainable</div>
          </div>
        </div>
      </div>
    </section>
  );
}
