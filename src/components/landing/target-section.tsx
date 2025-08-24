'use client';

import { Building2, Users, Shield } from 'lucide-react';

const targets = [
  {
    title: 'Operator Kios',
    desc: 'Operator kios air, micro-utilities, BUMD yang ingin revenue transparan dan fraud 0%',
    badge: 'Primary',
  },
  {
    title: 'NGO/DFI/Impact Investors',
    desc: 'NGO, Development Finance Institutions, dan impact investors mencari yield + ESG terverifikasi',
    badge: 'Funding',
  },
  {
    title: 'Retail LP',
    desc: 'Retail Limited Partners yang ingin akses ke impact investment dengan entry barrier rendah',
    badge: 'Retail',
  },
  {
    title: 'Auditor/Regulator',
    desc: 'Auditor dan regulator yang membutuhkan semua link public verifiable untuk compliance',
    badge: 'Compliance',
  },
];

export function TargetSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Target Customer
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Kami membangun produk untuk investor institusi, operator, dan
            komunitas yang ingin transparansi & hasil nyata.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {targets.map((t, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
                  {i === 0 ? (
                    <Building2 className="h-6 w-6" />
                  ) : i === 1 ? (
                    <Shield className="h-6 w-6" />
                  ) : (
                    <Users className="h-6 w-6" />
                  )}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  {t.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t.title}
              </h3>
              <p className="text-slate-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
