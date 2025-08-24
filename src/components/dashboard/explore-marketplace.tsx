'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProofPill from '@/components/ui/proof-pill';
import { getWellsByType, getTotalStats } from '@/lib/mock-data';
import {
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  Activity,
  Eye,
  CreditCard,
  Drill,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

const ExploreMarketplace = ({ initialType = 'Cashflow' as 'Cashflow' | 'Impact' }: { initialType?: 'Cashflow' | 'Impact' }) => {
  const [activeFilter, setActiveFilter] = useState<'Cashflow' | 'Impact'>(
    initialType
  );
  const wells = getWellsByType(activeFilter);
  const stats = getTotalStats();

  const ProjectCard = ({ well }: { well: any }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Active':
          return 'bg-green-100 text-green-800';
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'Maintenance':
          return 'bg-orange-100 text-orange-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))] hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-1">
              {well.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
              <MapPin className="h-4 w-4" />
              <span>{well.location}</span>
            </div>
          </div>
          <Badge className={getStatusColor(well.status)}>{well.status}</Badge>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
              {well.type === 'Cashflow'
                ? `${well.apr}%`
                : `${well.peopleServed.toLocaleString()}`}
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">
              {well.type === 'Cashflow' ? 'APR' : 'People Served'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
              {well.uptime}%
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">
              Uptime
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
              ${well.pricePerLiter.toFixed(3)}
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">
              Per Liter
            </div>
          </div>
        </div>

        {/* Proof Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {well.proofs.hcs.slice(0, 2).map((hcsId: string, index: number) => (
            <ProofPill
              key={hcsId}
              type="HCS"
              id={hcsId}
              size="sm"
              variant="success"
            />
          ))}
          {well.proofs.hts.slice(0, 1).map((htsId: string, index: number) => (
            <ProofPill
              key={htsId}
              type="HTS"
              id={htsId}
              size="sm"
              variant="default"
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          {well.type === 'Cashflow' ? (
            <>
              <Button
                size="sm"
                className="flex-1"
                onClick={() =>
                  toast.success('Subscription request submitted (mock)')
                }
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <Link href={`/ledger?id=${encodeURIComponent(well.id)}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => toast.success('Funding pledge submitted (mock)')}
              >
                <Drill className="h-4 w-4 mr-2" />
                Fund Drilling
              </Button>
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <Link href={`/ledger?id=${encodeURIComponent(well.id)}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Impact
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
            Water Well Marketplace
          </h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            Discover and invest in verified water infrastructure projects
          </p>
        </div>
        <div className="flex bg-[hsl(var(--muted))] p-1 rounded-lg">
          <Button
            variant={activeFilter === 'Cashflow' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveFilter('Cashflow')}
            className="px-6"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Cashflow
          </Button>
          <Button
            variant={activeFilter === 'Impact' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveFilter('Impact')}
            className="px-6"
          >
            <Users className="h-4 w-4 mr-2" />
            Impact
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Active Wells</span>
          </div>
          <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {stats.activeWells}
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            of {stats.totalWells} total
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-green-500" />
            <span className="font-semibold">People Served</span>
          </div>
          <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {stats.totalPeopleServed.toLocaleString()}
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            across all wells
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-purple-500" />
            <span className="font-semibold">Monthly Revenue</span>
          </div>
          <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
            ${stats.totalMonthlyRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            from active wells
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <span className="font-semibold">Avg Performance</span>
          </div>
          <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {activeFilter === 'Cashflow'
              ? `${stats.averageAPR.toFixed(1)}%`
              : `${stats.averageUptime.toFixed(1)}%`}
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            {activeFilter === 'Cashflow' ? 'APR' : 'Uptime'}
          </div>
        </div>
      </div>

      {/* Wells Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wells.map(well => (
          <ProjectCard key={well.id} well={well} />
        ))}
      </div>

      {/* Proof Summary */}
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Blockchain Verification Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <div className="font-semibold text-sm">HCS Consensus</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                Real-time meter readings & tariff updates
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <div className="font-semibold text-sm">HTS Transfers</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                Tokenized settlements & refunds
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div>
              <div className="font-semibold text-sm">NFT Passports</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                Immutable well identity & metadata
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMarketplace;
