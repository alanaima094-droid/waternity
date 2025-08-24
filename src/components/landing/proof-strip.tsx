'use client';

import { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, ExternalLink, Hash } from 'lucide-react';

interface ProofItem {
  id: string;
  type: 'verification' | 'transaction' | 'measurement' | 'audit';
  title: string;
  description: string;
  timestamp: Date;
  txHash: string;
  status: 'confirmed' | 'pending' | 'verified';
  wellId?: string;
  amount?: number;
}

// Mock real-time proof data
const generateMockProof = (): ProofItem => {
  const types: ProofItem['type'][] = [
    'verification',
    'transaction',
    'measurement',
    'audit',
  ];
  const statuses: ProofItem['status'][] = ['confirmed', 'verified'];

  const proofTemplates = {
    verification: [
      'Well water quality verified by independent lab',
      'Solar panel efficiency confirmed at 94.2%',
      'Community impact assessment completed',
      'Environmental compliance audit passed',
    ],
    transaction: [
      'Investment of $25,000 recorded on blockchain',
      'Quarterly returns distributed to investors',
      'Equipment purchase transaction confirmed',
      'Maintenance payment processed successfully',
    ],
    measurement: [
      'Daily water output: 15,420 liters recorded',
      'Energy consumption optimized by 12%',
      'Water quality metrics updated',
      'Flow rate measurement: 2.3L/min confirmed',
    ],
    audit: [
      'Monthly financial audit completed',
      'Sustainability metrics verified',
      'Operational efficiency review passed',
      'Compliance check: All standards met',
    ],
  };

  const type = types[Math.floor(Math.random() * types.length)];
  const templates = proofTemplates[type];
  const title = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    title,
    description: `Verified on Hedera blockchain with full transparency`,
    timestamp: new Date(),
    txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    wellId: `WELL-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`,
    amount:
      type === 'transaction'
        ? Math.floor(Math.random() * 100000) + 1000
        : undefined,
  };
};

function getProofIcon(type: ProofItem['type']) {
  switch (type) {
    case 'verification':
      return <Shield className="h-5 w-5" />;
    case 'transaction':
      return <CheckCircle className="h-5 w-5" />;
    case 'measurement':
      return <Clock className="h-5 w-5" />;
    case 'audit':
      return <Hash className="h-5 w-5" />;
    default:
      return <Shield className="h-5 w-5" />;
  }
}

function getProofColor(type: ProofItem['type']) {
  switch (type) {
    case 'verification':
      return 'text-green-600 bg-green-100';
    case 'transaction':
      return 'text-blue-600 bg-blue-100';
    case 'measurement':
      return 'text-purple-600 bg-purple-100';
    case 'audit':
      return 'text-orange-600 bg-orange-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function ProofStrip() {
  const [proofs, setProofs] = useState<ProofItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize with some proofs
  useEffect(() => {
    const initialProofs = Array.from({ length: 5 }, () => {
      const proof = generateMockProof();
      // Make timestamps spread over the last few minutes
      proof.timestamp = new Date(Date.now() - Math.random() * 300000);
      return proof;
    });
    setProofs(initialProofs);
  }, []);

  // Add new proofs periodically
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(
      () => {
        const newProof = generateMockProof();
        setProofs(prev => [newProof, ...prev.slice(0, 9)]); // Keep only 10 most recent
      },
      3000 + Math.random() * 4000
    ); // Random interval between 3-7 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="live-proofs"
      className="py-16 bg-slate-900 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live Blockchain Proofs
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Every action on our platform is verified and recorded on the Hedera
            blockchain. Watch real-time proof of our transparency and
            accountability.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              isPaused
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {isPaused ? 'Resume Live Feed' : 'Pause Live Feed'}
          </button>
        </div>

        {/* Proof Feed */}
        <div className="space-y-4 max-h-96 overflow-hidden">
          {proofs.map((proof, index) => (
            <div
              key={proof.id}
              className={`bg-slate-800 rounded-xl p-6 border border-slate-700 transition-all duration-500 ${
                index === 0 && !isPaused ? 'animate-pulse border-blue-500' : ''
              }`}
              style={{
                opacity: Math.max(0.3, 1 - index * 0.1),
                transform: `translateY(${index * 2}px)`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Icon */}
                  <div
                    className={`p-2 rounded-lg ${getProofColor(proof.type)}`}
                  >
                    {getProofIcon(proof.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-white truncate">
                        {proof.title}
                      </h3>
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full capitalize">
                        {proof.type}
                      </span>
                      {proof.status === 'verified' && (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-slate-400 text-sm mb-3">
                      {proof.description}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>{formatTimeAgo(proof.timestamp)}</span>
                      {proof.wellId && <span>Well: {proof.wellId}</span>}
                      {proof.amount && (
                        <span>Amount: ${proof.amount.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transaction Hash */}
                <div className="flex items-center space-x-2 ml-4">
                  <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Tx Hash</div>
                    <div className="font-mono text-xs text-slate-400 truncate max-w-24">
                      {proof.txHash.slice(0, 8)}...{proof.txHash.slice(-6)}
                    </div>
                  </div>
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {proofs.filter(p => p.status === 'verified').length}
            </div>
            <div className="text-slate-400 text-sm">Verified Proofs</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {proofs.filter(p => p.type === 'transaction').length}
            </div>
            <div className="text-slate-400 text-sm">Transactions</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {proofs.filter(p => p.type === 'measurement').length}
            </div>
            <div className="text-slate-400 text-sm">Measurements</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {proofs.filter(p => p.type === 'audit').length}
            </div>
            <div className="text-slate-400 text-sm">Audits</div>
          </div>
        </div>

        {/* Blockchain Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-slate-800 rounded-xl px-6 py-4 border border-slate-700">
            <Shield className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-slate-300">
              Secured by{' '}
              <span className="font-semibold text-white">Hedera Hashgraph</span>{' '}
              - The most sustainable blockchain network
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
