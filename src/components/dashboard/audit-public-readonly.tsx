'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProofPill from '@/components/ui/proof-pill';
import {
  Copy,
  Download,
  ExternalLink,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Database,
  Activity,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data untuk HCS Stream
const hcsStreamData = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    consensusId: '0.0.123456',
    topicId: '0.0.789012',
    sequenceNumber: 1001,
    messageType: 'WELL_PRODUCTION',
    wellId: 'WELL-001',
    liters: 2500,
    status: 'CONFIRMED',
    runningHash: '0x1a2b3c4d5e6f...',
    validStart: '2024-01-15 14:30:20',
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:25:18',
    consensusId: '0.0.123457',
    topicId: '0.0.789012',
    sequenceNumber: 1000,
    messageType: 'TARIFF_UPDATE',
    wellId: 'WELL-001',
    newTariff: '0.025 HBAR/L',
    status: 'CONFIRMED',
    runningHash: '0x2b3c4d5e6f7a...',
    validStart: '2024-01-15 14:25:15',
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:20:42',
    consensusId: '0.0.123458',
    topicId: '0.0.789012',
    sequenceNumber: 999,
    messageType: 'DEVICE_CALIBRATION',
    wellId: 'WELL-001',
    deviceId: 'SENSOR-A1',
    status: 'CONFIRMED',
    runningHash: '0x3c4d5e6f7a8b...',
    validStart: '2024-01-15 14:20:40',
  },
];

// Mock data untuk HTS Transfers
const htsTransferData = [
  {
    id: '1',
    timestamp: '2024-01-15 14:32:10',
    transactionId: '0.0.123456@1705329130.123456789',
    tokenId: '0.0.456789',
    tokenSymbol: 'WATER',
    from: '0.0.111111',
    to: '0.0.222222',
    amount: 2500,
    type: 'PURCHASE',
    status: 'SUCCESS',
    fee: '0.001 HBAR',
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:28:45',
    transactionId: '0.0.123457@1705328925.987654321',
    tokenId: '0.0.456789',
    tokenSymbol: 'WATER',
    from: '0.0.333333',
    to: '0.0.444444',
    amount: 1800,
    type: 'TRANSFER',
    status: 'SUCCESS',
    fee: '0.001 HBAR',
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:15:20',
    transactionId: '0.0.123458@1705328120.456789123',
    tokenId: '0.0.456789',
    tokenSymbol: 'WATER',
    from: '0.0.555555',
    to: '0.0.666666',
    amount: 3200,
    type: 'MINT',
    status: 'SUCCESS',
    fee: '0.002 HBAR',
  },
];

// Mock reconciliation data
const reconciliationData = {
  totalProduced: 125000,
  totalMinted: 124800,
  totalTransferred: 98500,
  totalBurned: 2300,
  currentSupply: 122500,
  lastReconciliation: '2024-01-15 14:00:00',
  status: 'BALANCED',
  variance: 200,
  variancePercentage: 0.16,
};

function AuditPublicReadOnly() {
  const [activeTab, setActiveTab] = useState('hcs-stream');
  const [selectedWell, setSelectedWell] = useState('WELL-001');

  const copyAuditUrl = () => {
    const auditUrl = `https://waternity.io/audit/${selectedWell}`;
    navigator.clipboard.writeText(auditUrl);
    toast.success('Audit URL copied to clipboard');
  };

  const exportData = (format: 'csv' | 'json') => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
    // Implement actual export logic here
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'SUCCESS':
      case 'BALANCED':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Public Audit Trail
          </h2>
          <p className="text-muted-foreground">
            Transparent, immutable record of all water production and
            transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyAuditUrl}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Audit URL
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportData('json')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Well Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Audit Scope
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm font-medium">Selected Well:</label>
              <select
                value={selectedWell}
                onChange={e => setSelectedWell(e.target.value)}
                className="ml-2 px-3 py-1 border rounded-md"
              >
                <option value="WELL-001">WELL-001 - Bandung Aquifer</option>
                <option value="WELL-002">WELL-002 - Jakarta Basin</option>
                <option value="WELL-003">WELL-003 - Surabaya Springs</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                Verified & Immutable
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Real-time Reconciliation
          </CardTitle>
          <CardDescription>
            Automated balance verification between physical production and
            digital tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {reconciliationData.totalProduced.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">Liters Produced</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {reconciliationData.totalMinted.toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Tokens Minted</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {reconciliationData.currentSupply.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">Current Supply</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {reconciliationData.variancePercentage}%
              </div>
              <div className="text-sm text-gray-600">Variance</div>
              {getStatusBadge(reconciliationData.status)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Audit Data */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hcs-stream">HCS Consensus Stream</TabsTrigger>
          <TabsTrigger value="hts-transfers">HTS Token Transfers</TabsTrigger>
        </TabsList>

        <TabsContent value="hcs-stream" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hedera Consensus Service Stream</CardTitle>
              <CardDescription>
                Immutable log of all well operations and measurements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Message Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Consensus Proof</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hcsStreamData.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">
                        {record.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.messageType}</Badge>
                      </TableCell>
                      <TableCell>
                        {record.messageType === 'WELL_PRODUCTION' && (
                          <span>
                            {record.liters} liters from {record.wellId}
                          </span>
                        )}
                        {record.messageType === 'TARIFF_UPDATE' && (
                          <span>New tariff: {record.newTariff}</span>
                        )}
                        {record.messageType === 'DEVICE_CALIBRATION' && (
                          <span>Device {record.deviceId} calibrated</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <ProofPill
                          type="HCS"
                          id={record.consensusId}
                          label={`Seq ${record.sequenceNumber}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hts-transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hedera Token Service Transfers</CardTitle>
              <CardDescription>
                All WATER token minting, transfers, and burns on Hedera network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction Proof</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {htsTransferData.map(transfer => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-mono text-sm">
                        {transfer.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transfer.type === 'MINT'
                              ? 'default'
                              : transfer.type === 'PURCHASE'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {transfer.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {transfer.from === '0.0.0' ? 'MINT' : transfer.from}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {transfer.to}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {transfer.amount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          {transfer.tokenSymbol}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                      <TableCell>
                        <ProofPill
                          type="HTS"
                          id={transfer.transactionId}
                          label="View Tx"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Last updated: {reconciliationData.lastReconciliation}</span>
              <span>•</span>
              <span>Auto-refresh: Every 30 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Powered by Hedera Hashgraph</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { AuditPublicReadOnly };
export default AuditPublicReadOnly;
