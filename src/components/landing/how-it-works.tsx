'use client';

import { Search, DollarSign, BarChart3, Droplets } from 'lucide-react';

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: '01',
    icon: <Search className="h-8 w-8" />,
    title: 'Discover Wells',
    description:
      'Browse verified water conservation projects from around the world',
    details: [
      'Explore wells by location, impact potential, and investment terms',
      'Review detailed project documentation and verification status',
      'Access real-time performance metrics and sustainability data',
    ],
  },
  {
    number: '02',
    icon: <DollarSign className="h-8 w-8" />,
    title: 'Invest Securely',
    description:
      'Make investments with full transparency and blockchain verification',
    details: [
      'Complete KYC verification for regulatory compliance',
      'Choose investment amount and terms that fit your portfolio',
      'All transactions recorded immutably on Hedera blockchain',
    ],
  },
  {
    number: '03',
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Track Performance',
    description:
      'Monitor your investments and their environmental impact in real-time',
    details: [
      'View detailed analytics on water conservation metrics',
      'Track financial returns and impact measurements',
      'Receive regular updates on project milestones',
    ],
  },
  {
    number: '04',
    icon: <Droplets className="h-8 w-8" />,
    title: 'Generate Impact',
    description:
      'Earn returns while contributing to global water sustainability',
    details: [
      'Receive competitive financial returns on your investment',
      'Profits fund new wells, expanding water access to more communities',
      'Build a portfolio that aligns with your values',
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our platform makes water sustainability investing simple,
            transparent, and impactful. Here&#39;s how you can start making a
            difference today.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-6 mt-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details List */}
                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector Line (for desktop) */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
              )}
              {index < steps.length - 1 && index % 2 === 1 && (
                <div className="hidden lg:block absolute top-1/2 -left-8 w-16 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Water Investment Journey?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of investors who are already making a positive
              impact on global water sustainability while earning competitive
              returns.
            </p>
            <a href="/dashboard" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200">
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
