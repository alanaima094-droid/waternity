'use client';

import { TrendingUp, Shield, Globe, Users, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Essential {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: {
    value: string;
    label: string;
  }[];
}

const essentials: Essential[] = [
  {
    icon: <TrendingUp className="h-12 w-12" />,
    title: 'Proven Returns',
    description:
      'Our water sustainability investments deliver consistent, competitive returns while creating positive environmental impact.',
    stats: [
      { value: '12.4%', label: 'Average Annual ROI' },
      { value: '94%', label: 'Positive Return Rate' },
    ],
  },
  {
    icon: <Shield className="h-12 w-12" />,
    title: 'Blockchain Verified',
    description:
      'Every investment, transaction, and impact metric is transparently recorded and verified on the Hedera blockchain.',
    stats: [
      { value: '100%', label: 'Transparency' },
      { value: '0', label: 'Fraud Cases' },
    ],
  },
  {
    icon: <Globe className="h-12 w-12" />,
    title: 'Global Impact',
    description:
      "Invest in water conservation projects across 40+ countries, addressing the world's most critical water challenges.",
    stats: [
      { value: '40+', label: 'Countries' },
      { value: '2.1M', label: 'People Served' },
    ],
  },
  {
    icon: <Users className="h-12 w-12" />,
    title: 'Expert Management',
    description:
      'Our team combines decades of experience in water engineering, sustainable finance, and blockchain technology.',
    stats: [
      { value: '25+', label: 'Years Experience' },
      { value: '50+', label: 'Water Experts' },
    ],
  },
  {
    icon: <Award className="h-12 w-12" />,
    title: 'Regulatory Compliant',
    description:
      'Fully compliant with international investment regulations and environmental standards across all jurisdictions.',
    stats: [
      { value: 'ISO 14001', label: 'Certified' },
      { value: 'SEC', label: 'Registered' },
    ],
  },
  {
    icon: <Zap className="h-12 w-12" />,
    title: 'Technology Driven',
    description:
      'Leveraging IoT sensors, AI analytics, and blockchain technology for optimal project monitoring and management.',
    stats: [
      { value: '24/7', label: 'Monitoring' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
];

const keyMetrics = [
  {
    value: '$24.5M',
    label: 'Total Assets Under Management',
    description: 'Capital deployed across our global portfolio',
  },
  {
    value: '1,247',
    label: 'Active Water Projects',
    description: 'Verified wells generating returns and impact',
  },
  {
    value: '8,934',
    label: 'Global Investors',
    description: 'Community of impact-focused investors',
  },
  {
    value: '156M',
    label: 'Liters Water Conserved',
    description: 'Measurable environmental impact achieved',
  },
];

export function PitchEssentials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Why Choose
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Waternity?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The world&#39;s most advanced platform for water sustainability
            investing. Combining proven returns with measurable environmental
            impact.
          </p>
        </div>

        {/* Key Metrics Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-20 text-white">
          <div className="grid md:grid-cols-4 gap-8">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {metric.value}
                </div>
                <div className="font-semibold mb-1">{metric.label}</div>
                <div className="text-blue-100 text-sm">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {essentials.map((essential, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                {essential.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {essential.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {essential.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {essential.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Investment Tiers */}
        <div className="bg-slate-50 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Investment Opportunities
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose the investment tier that aligns with your portfolio goals
              and impact objectives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Tier */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Starter
                </h4>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  $1,000
                </div>
                <div className="text-slate-500">Minimum Investment</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  <span className="text-slate-600">
                    Access to verified wells
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  <span className="text-slate-600">
                    Quarterly impact reports
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  <span className="text-slate-600">
                    Basic analytics dashboard
                  </span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Start Investing
              </Button>
            </div>

            {/* Growth Tier */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold mb-2">Growth</h4>
                <div className="text-3xl font-bold mb-1">$10,000</div>
                <div className="text-blue-100">Minimum Investment</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  <span>Priority access to new wells</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  <span>Monthly impact reports</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  <span>Advanced analytics & insights</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                Start Investing
              </Button>
            </div>

            {/* Premium Tier */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Premium
                </h4>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  $100,000
                </div>
                <div className="text-slate-500">Minimum Investment</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  <span className="text-slate-600">
                    Exclusive well opportunities
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  <span className="text-slate-600">
                    Real-time impact tracking
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  <span className="text-slate-600">
                    Custom portfolio management
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  <span className="text-slate-600">
                    Direct expert consultation
                  </span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Ready to Make an Impact?
          </h3>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join the future of sustainable investing. Start generating returns
            while securing our planet&#39;s most precious resource.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
            >
              Start Investing Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-700 px-8 py-4"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
