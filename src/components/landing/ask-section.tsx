'use client';

import { TrendingUp, Globe, DollarSign } from 'lucide-react';

const askItems = [
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: 'Raise $2.0M Seed',
    desc: 'Series A funding untuk ekspansi infrastruktur dan teknologi',
    highlight: '$2.0M',
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Scale 5,000 Kios',
    desc: 'Deployment di 3 negara dengan fokus Sub-Sahara Africa',
    highlight: '3 Countries',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Run-rate >$10M',
    desc: 'Target revenue dalam 18 bulan dengan sustainable growth',
    highlight: '18 Months',
  },
];

export function AskSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            The Ask
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join us in revolutionizing water access with blockchain
            transparency. Together, we can unlock $803M/yr revenue potential.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {askItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {item.highlight}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Water Access?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Partner dengan kami untuk membuka potensi $803M/yr revenue dan
              memberikan akses air bersih untuk 400M orang di Sub-Sahara Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Schedule Investor Call
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Download Pitch Deck
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">$803M</div>
            <div className="text-slate-600">Annual Revenue Potential</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">400M</div>
            <div className="text-slate-600">People Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
            <div className="text-slate-600">Investor Yield</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">0%</div>
            <div className="text-slate-600">Revenue Fraud</div>
          </div>
        </div>
      </div>
    </section>
  );
}
