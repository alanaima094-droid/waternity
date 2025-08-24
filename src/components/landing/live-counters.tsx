'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Droplets, Users, DollarSign } from 'lucide-react';

interface CounterData {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  color: string;
  description: string;
}

// Mock data - in real app, this would come from API
const initialCounters: CounterData[] = [
  {
    icon: <Droplets className="h-8 w-8" />,
    label: 'Active Wells',
    value: 1247,
    suffix: '',
    color: 'text-blue-600',
    description: 'Verified water conservation projects worldwide',
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    label: 'Total Invested',
    value: 24500000,
    suffix: '',
    prefix: '$',
    color: 'text-green-600',
    description: 'Capital deployed for water sustainability',
  },
  {
    icon: <Users className="h-8 w-8" />,
    label: 'Active Investors',
    value: 8934,
    suffix: '',
    color: 'text-purple-600',
    description: 'Global community of water impact investors',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    label: 'Water Saved',
    value: 156789,
    suffix: 'L',
    color: 'text-cyan-600',
    description: 'Liters of water conserved through our projects',
  },
];

function formatNumber(num: number, prefix = '', suffix = ''): string {
  if (num >= 1000000) {
    return `${prefix}${(num / 1000000).toFixed(1)}M${suffix}`;
  } else if (num >= 1000) {
    return `${prefix}${(num / 1000).toFixed(1)}K${suffix}`;
  }
  return `${prefix}${num.toLocaleString()}${suffix}`;
}

function AnimatedCounter({
  targetValue,
  prefix = '',
  suffix = '',
  duration = 2000,
}: {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(targetValue * easeOutQuart);

      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration]);

  return (
    <span className="font-bold">
      {formatNumber(currentValue, prefix, suffix)}
    </span>
  );
}

export function LiveCounters() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('live-counters');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="live-counters" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Platform Impact
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              in Real-Time
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See the live impact of our global water sustainability investment
            platform. These numbers update in real-time as our community grows.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialCounters.map((counter, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mb-6 ${counter.color}`}
              >
                {counter.icon}
              </div>

              {/* Counter Value */}
              <div
                className={`text-4xl md:text-5xl font-bold mb-2 ${counter.color}`}
              >
                {isVisible ? (
                  <AnimatedCounter
                    targetValue={counter.value}
                    prefix={counter.prefix}
                    suffix={counter.suffix}
                    duration={2000 + index * 200} // Stagger animations
                  />
                ) : (
                  formatNumber(0, counter.prefix, counter.suffix)
                )}
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {counter.label}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {counter.description}
              </p>

              {/* Live Indicator */}
              <div className="flex items-center justify-center mt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  99.7%
                </div>
                <div className="text-slate-700 font-medium">
                  Verification Rate
                </div>
                <div className="text-sm text-slate-500">
                  All projects verified
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  12.4%
                </div>
                <div className="text-slate-700 font-medium">
                  Avg. Annual Return
                </div>
                <div className="text-sm text-slate-500">
                  Historical performance
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  24/7
                </div>
                <div className="text-slate-700 font-medium">Monitoring</div>
                <div className="text-sm text-slate-500">Real-time tracking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
