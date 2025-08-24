'use client';

import React, { useState } from 'react';
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

const WellLedger = () => {
  const [selectedWellId, setSelectedWellId] = useState('well-001');
  const [activeSubTab, setActiveSubTab] = useState('overview');

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
          {selectedWell.totalVolume.toLocaleString()}
        </div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Liters dispensed
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
          Monthly
        </div>
      </div>
    </div>
  );

  const QuickProofs = () => (
    <div className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))] mb-6">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">
        Quick Proofs
      </h3>
      <div className="flex flex-wrap gap-2">
        {selectedWell.proofs.hcs.slice(0, 3).map((hcsId, index) => (
          <ProofPill
            key={hcsId}
            type="HCS"
            id={hcsId}
            size="sm"
            variant="success"
            label={`Event ${index + 1}`}
          />
        ))}
        {selectedWell.proofs.hts.slice(0, 2).map((htsId, index) => (
          <ProofPill
            key={htsId}
            type="HTS"
            id={htsId}
            size="sm"
            variant="default"
            label={`Transfer ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
          <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
            Well Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[hsl(var(--muted-foreground))]">
                Location:
              </span>
              <span className="font-medium">{selectedWell.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--muted-foreground))]">Type:</span>
              <Badge
                className={
                  selectedWell.type === 'Cashflow'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }
              >
                {selectedWell.type}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--muted-foreground))]">
                Status:
              </span>
              <Badge
                className={
                  selectedWell.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }
              >
                {selectedWell.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--muted-foreground))]">
                Device ID:
              </span>
              <span className="font-mono text-sm">{selectedWell.deviceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--muted-foreground))]">
                Price per Liter:
              </span>
              <span className="font-medium">
                ${selectedWell.pricePerLiter.toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
          <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
            Blockchain Assets
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[hsl(var(--muted-foreground))]">
                Well Passport NFT:
              </span>
              <ProofPill
                type="HTS"
                id={selectedWell.wellPassportNFT}
                size="sm"
                label="NFT"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[hsl(var(--muted-foreground))]">
                Operator Address:
              </span>
              <span className="font-mono text-sm">
                {selectedWell.operatorAddress}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[hsl(var(--muted-foreground))]">
                Escrow Address:
              </span>
              <span className="font-mono text-sm">
                {selectedWell.escrowAddress}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Maintenance Schedule
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <div className="font-medium">Last Maintenance</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedWell.lastMaintenance}
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
    </div>
  );

  const LiterTimelineTab = () => (
    <div className="space-y-4">
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Water Dispensing Timeline
        </h4>
        <div className="space-y-4">
          {wellTransactions
            .filter(tx => tx.type === 'withdrawal')
            .map(tx => (
              <div
                key={tx.id}
                className="flex items-center gap-4 p-4 bg-[hsl(var(--muted))] rounded-lg"
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">
                    {new Date(tx.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${tx.amount}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">
                    {(tx.amount / selectedWell.pricePerLiter).toFixed(1)}L
                  </div>
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
    <div className="space-y-4">
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Financial Reconciliation
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              $
              {wellTransactions
                .filter(tx => tx.type === 'deposit')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Total Deposits
            </div>
          </div>
          <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              $
              {wellTransactions
                .filter(tx => tx.type === 'withdrawal')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Total Withdrawals
            </div>
          </div>
          <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              $
              {wellTransactions
                .filter(tx => tx.type === 'refund')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Total Refunds
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-medium text-green-800">
            All transactions reconciled
          </span>
          <ProofPill
            type="HCS"
            id="1706918400.reconciliation"
            size="sm"
            label="Reconciled"
          />
        </div>
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div className="space-y-4">
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Well Documentation
        </h4>
        <div className="space-y-3">
          {[
            {
              name: 'Well Construction Certificate',
              type: 'PDF',
              size: '2.3 MB',
              hcs: '1704067200.cert001',
            },
            {
              name: 'Water Quality Report',
              type: 'PDF',
              size: '1.8 MB',
              hcs: '1704153600.quality001',
            },
            {
              name: 'Maintenance Log',
              type: 'CSV',
              size: '0.5 MB',
              hcs: '1704240000.maint001',
            },
            {
              name: 'Financial Audit',
              type: 'PDF',
              size: '3.1 MB',
              hcs: '1704326400.audit001',
            },
          ].map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-[hsl(var(--muted))] rounded-lg"
            >
              <FileText className="h-8 w-8 text-blue-500" />
              <div className="flex-1">
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
            onChange={e => setSelectedWellId(e.target.value)}
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
        onValueChange={setActiveSubTab}
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
