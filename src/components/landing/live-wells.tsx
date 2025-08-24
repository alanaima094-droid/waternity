'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  TrendingUp,
  Droplets,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Well {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  status: 'active' | 'funding' | 'completed';
  progress: number;
  totalInvestment: number;
  currentInvestment: number;
  waterSaved: number;
  investors: number;
  roi: number;
  description: string;
  tags: string[];
}

// Mock data - in real app, this would come from API
const mockWells: Well[] = [
  {
    id: '1',
    name: 'Sahara Solar Desalination',
    location: 'Morocco',
    country: 'MA',
    image: '/api/placeholder/400/300',
    status: 'active',
    progress: 78,
    totalInvestment: 2500000,
    currentInvestment: 1950000,
    waterSaved: 45000,
    investors: 234,
    roi: 14.2,
    description:
      'Solar-powered desalination plant providing clean water to rural communities while generating sustainable returns.',
    tags: ['Solar', 'Desalination', 'Rural'],
  },
  {
    id: '2',
    name: 'Amazon Rainwater Harvesting',
    location: 'Brazil',
    country: 'BR',
    image: '/api/placeholder/400/300',
    status: 'funding',
    progress: 45,
    totalInvestment: 1800000,
    currentInvestment: 810000,
    waterSaved: 28000,
    investors: 156,
    roi: 12.8,
    description:
      'Innovative rainwater collection system preserving Amazon ecosystem while providing water access.',
    tags: ['Rainwater', 'Conservation', 'Amazon'],
  },
  {
    id: '3',
    name: 'Himalayan Glacier Protection',
    location: 'Nepal',
    country: 'NP',
    image: '/api/placeholder/400/300',
    status: 'active',
    progress: 92,
    totalInvestment: 3200000,
    currentInvestment: 2944000,
    waterSaved: 67000,
    investors: 412,
    roi: 15.6,
    description:
      'Glacier preservation project ensuring long-term water security for mountain communities.',
    tags: ['Glacier', 'Mountain', 'Preservation'],
  },
  {
    id: '4',
    name: 'Australian Drought Relief',
    location: 'Australia',
    country: 'AU',
    image: '/api/placeholder/400/300',
    status: 'completed',
    progress: 100,
    totalInvestment: 2100000,
    currentInvestment: 2100000,
    waterSaved: 52000,
    investors: 298,
    roi: 13.4,
    description:
      'Drought-resistant water infrastructure supporting agricultural communities during dry seasons.',
    tags: ['Drought', 'Agriculture', 'Infrastructure'],
  },
];

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

function getStatusColor(status: Well['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'funding':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusText(status: Well['status']): string {
  switch (status) {
    case 'active':
      return 'Active';
    case 'funding':
      return 'Funding';
    case 'completed':
      return 'Completed';
    default:
      return 'Unknown';
  }
}

export function LiveWells() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mockWells.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextWell = () => {
    setCurrentIndex(prev => (prev + 1) % mockWells.length);
    setIsAutoPlaying(false);
  };

  const prevWell = () => {
    setCurrentIndex(prev => (prev - 1 + mockWells.length) % mockWells.length);
    setIsAutoPlaying(false);
  };

  const currentWell = mockWells[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Live Wells
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Around the World
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore active water conservation projects from our global network.
            Each well represents a real opportunity to invest in water
            sustainability.
          </p>
        </div>

        {/* Featured Well Carousel */}
        <div className="relative mb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Well Image */}
              <div className="relative h-96 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                  <Droplets className="h-24 w-24 text-slate-400" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(currentWell.status)}`}
                  >
                    {getStatusText(currentWell.status)}
                  </span>
                </div>

                {/* Live Indicator */}
                <div className="absolute top-6 right-6 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                  <span className="text-xs font-medium text-slate-700">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Well Details */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center text-slate-500 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>
                    {currentWell.location}, {currentWell.country}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {currentWell.name}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {currentWell.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentWell.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Funding Progress</span>
                    <span>{currentWell.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${currentWell.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="flex items-center text-slate-500 mb-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">ROI</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {currentWell.roi}%
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-slate-500 mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">Investors</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {currentWell.investors}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-slate-500 mb-1">
                      <Droplets className="h-4 w-4 mr-1" />
                      <span className="text-sm">Water Saved</span>
                    </div>
                    <div className="text-2xl font-bold text-cyan-600">
                      {currentWell.waterSaved.toLocaleString()}L
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-sm mb-1">
                      Investment
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(currentWell.currentInvestment)}
                    </div>
                    <div className="text-sm text-slate-500">
                      of {formatCurrency(currentWell.totalInvestment)}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  View Details & Invest
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevWell}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-slate-600" />
          </button>

          <button
            onClick={nextWell}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Well Indicators */}
        <div className="flex justify-center space-x-3 mb-12">
          {mockWells.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="text-center">
          <div className="inline-flex items-center bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center px-6">
              <div className="text-2xl font-bold text-blue-600">
                {mockWells.length}
              </div>
              <div className="text-sm text-slate-600">Active Wells</div>
            </div>
            <div className="w-px h-12 bg-slate-200 mx-4" />
            <div className="text-center px-6">
              <div className="text-2xl font-bold text-green-600">
                {mockWells.filter(w => w.status === 'active').length}
              </div>
              <div className="text-sm text-slate-600">Generating Returns</div>
            </div>
            <div className="w-px h-12 bg-slate-200 mx-4" />
            <div className="text-center px-6">
              <div className="text-2xl font-bold text-purple-600">
                {mockWells.filter(w => w.status === 'funding').length}
              </div>
              <div className="text-sm text-slate-600">Seeking Investment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
