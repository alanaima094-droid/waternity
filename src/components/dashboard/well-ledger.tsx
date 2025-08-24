'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProofPill from '@/components/ui/proof-pill';
import {
  mockWells,
  getWellById,
  getTransactionsByWellId,
} from '@/lib/mock-data';
import {
  MapPin,
  Droplets,
  DollarSign,
  Activity,
  FileText,
  Download,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const WellLedger = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedWellId, setSelectedWellId] = useState('well-001');
  const [activeSubTab, setActiveSubTab] = useState('overview');

  // Initialize from URL search params on mount or when URL changes
  useEffect(() => {
    const id = searchParams.get('id');
    const tab = searchParams.get('tab');

    if (id && id !== selectedWellId) {
      // Fallback: ensure id exists in mockWells
      const exists = mockWells.some(w => w.id === id);
      if (exists) setSelectedWellId(id);
    }
    if (tab && tab !== activeSubTab) {
      const allowed = ['overview', 'liter-timeline', 'settlement', 'reconciliation', 'documents'];
      if (allowed.includes(tab)) setActiveSubTab(tab);
    }
  }, [searchParams]);

  const updateUrl = (id: string, tab: string) => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    params.set('id', id);
    params.set('tab', tab);
    router.replace(`?${params.toString()}`);
  };

  const handleWellChange = (value: string) => {
    setSelectedWellId(value);
    updateUrl(value, activeSubTab);
  };

  const handleTabChange = (value: string) => {
    setActiveSubTab(value);
    updateUrl(selectedWellId, value);
  };

  const selectedWell = getWellById(selectedWellId);
  const wellTransactions = getTransactionsByWellId(selectedWellId);

  if (!selectedWell) return null;

  const HeaderKPIs = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="font-semibold text-sm">Performance</span>
        </div>
        <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
          {selectedWell.type === 'Cashflow'
            ? `${selectedWell.apr}%`
            : `${selectedWell.peopleServed.toLocaleString()}`}
        </div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          {selectedWell.type === 'Cashflow' ? 'APR' : 'People Served'}
        </div>
      </div>

      <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-5 w-5 text-blue-500" />
          <span className="font-semibold text-sm">Uptime</span>
        </div>
        <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
          {selectedWell.uptime}%
        </div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Last 30 days
        </div>
      </div>

      <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="h-5 w-5 text-cyan-500" />
          <span className="font-semibold text-sm">Volume</span>
        </div>
        <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
          {selectedWell.totalVolume.toLocaleString()} L
        </div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Total dispensed
        </div>
      </div>

      <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="h-5 w-5 text-purple-500" />
          <span className="font-semibold text-sm">Revenue</span>
        </div>
        <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
          ${selectedWell.monthlyRevenue.toLocaleString()}
        </div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Last month
        </div>
      </div>
    </div>
  );

  const QuickProofs = () => (
    <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))] mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
          Quick Proofs
        </h3>
        <div className="flex gap-2">
          {selectedWell.proofs.hcs.slice(0, 2).map((id: string) => (
            <ProofPill key={id} type="HCS" id={id} size="sm" />
          ))}
          {selectedWell.proofs.hts.slice(0, 1).map((id: string) => (
            <ProofPill key={id} type="HTS" id={id} size="sm" />
          ))}
        </div>
      </div>
      <div className="text-xs text-[hsl(var(--muted-foreground))]">
        Tap a proof to view on HashScan/Mirror Node
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Well Info */}
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Well Information
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-red-500" />
            <div>
              <div className="font-medium">Location</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedWell.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-emerald-500" />
            <div>
              <div className="font-medium">NFT Passport</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                Token ID: {selectedWell.nftPassport}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <div className="font-medium">Next Maintenance</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedWell.nextMaintenance}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Assets */}
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Blockchain Assets
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Tariff Topic</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedWell.proofs.hcs[0]}
              </div>
            </div>
            <ProofPill type="HCS" id={selectedWell.proofs.hcs[0]} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Settlement Token</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedWell.proofs.hts[0]}
              </div>
            </div>
            <ProofPill type="HTS" id={selectedWell.proofs.hts[0]} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">NFT Passport</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedWell.nftPassport}
              </div>
            </div>
            <Badge>ERC-721</Badge>
          </div>
        </div>
      </div>
    </div>
  );

  const LiterTimelineTab = () => (
    <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
      <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
        Water Dispensing Timeline
      </h4>
      <div className="space-y-4">
        {wellTransactions
          .filter(tx => tx.type === 'deposit' || tx.type === 'withdrawal')
          .map(tx => (
            <div
              key={tx.id}
              className="flex items-center gap-4 p-4 bg-[hsl(var(--muted))] rounded-lg"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  tx.type === 'deposit' ? 'bg-blue-500' : 'bg-red-500'
                }`}
              ></div>
              <div className="flex-1">
                <div className="font-medium">{tx.description}</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{tx.liters} L</div>
                <Badge
                  className={
                    tx.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {tx.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                {tx.hcsId && <ProofPill type="HCS" id={tx.hcsId} size="sm" />}
                {tx.htsId && <ProofPill type="HTS" id={tx.htsId} size="sm" />}
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const SettlementTab = () => (
    <div className="space-y-4">
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Settlement History
        </h4>
        <div className="space-y-4">
          {wellTransactions
            .filter(tx => tx.type === 'settlement' || tx.type === 'refund')
            .map(tx => (
              <div
                key={tx.id}
                className="flex items-center gap-4 p-4 bg-[hsl(var(--muted))] rounded-lg"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    tx.type === 'settlement' ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">
                    {new Date(tx.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${tx.amount.toLocaleString()}
                  </div>
                  <Badge
                    className={
                      tx.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {tx.hcsId && <ProofPill type="HCS" id={tx.hcsId} size="sm" />}
                  {tx.htsId && <ProofPill type="HTS" id={tx.htsId} size="sm" />}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const ReconciliationTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Financial Reconciliation
        </h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-[hsl(var(--muted))] rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="flex-1">
              <div className="font-medium">Last Settlement Matched</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                All transactions reconciled successfully
              </div>
            </div>
            <ProofPill type="HCS" id={selectedWell.proofs.hcs[1] || selectedWell.proofs.hcs[0]} size="sm" />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Liter-to-Cash Ratio
            </div>
            <div className="font-semibold">1 L = ${selectedWell.pricePerLiter.toFixed(3)}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Outstanding Refunds
            </div>
            <div className="font-semibold">0</div>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Proof of Reconciliation
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Ledger Snapshot (HCS)
            </div>
            <ProofPill type="HCS" id={selectedWell.proofs.hcs[2] || selectedWell.proofs.hcs[0]} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Settlement Batch (HTS)
            </div>
            <ProofPill type="HTS" id={selectedWell.proofs.hts[1] || selectedWell.proofs.hts[0]} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
      <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
        Well Documentation
      </h4>
      <div className="space-y-4">
        {selectedWell.documents.map((doc: any, idx: number) => (
          <div
            key={`${doc.name}-${idx}`}
            className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-lg"
          >
            <div>
              <div className="font-medium">{doc.name}</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {doc.type} • {doc.size}
              </div>
            </div>
            <ProofPill type="HCS" id={doc.hcs} size="sm" />
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success(`Downloading ${doc.name} (mock)`)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
            Well Ledger: {selectedWell.name}
          </h2>
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <MapPin className="h-4 w-4" />
            <span>{selectedWell.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedWellId}
            onChange={e => handleWellChange(e.target.value)}
            className="px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))]"
          >
            {mockWells.map(well => (
              <option key={well.id} value={well.id}>
                {well.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Header KPIs */}
      <HeaderKPIs />

      {/* Quick Proofs */}
      <QuickProofs />

      {/* Internal Tabs */}
      <Tabs
        value={activeSubTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="liter-timeline">Liter Timeline</TabsTrigger>
          <TabsTrigger value="settlement">Settlement</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="liter-timeline" className="mt-6">
          <LiterTimelineTab />
        </TabsContent>

        <TabsContent value="settlement" className="mt-6">
          <SettlementTab />
        </TabsContent>

        <TabsContent value="reconciliation" className="mt-6">
          <ReconciliationTab />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellLedger;
