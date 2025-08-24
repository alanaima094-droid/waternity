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
import ProofPill from '@/components/ui/proof-pill';
import {
  TrendingUp,
  Download,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Wallet,
  BarChart3,
} from 'lucide-react';
import { toast } from 'sonner';

interface Position {
  id: string;
  wellId: string;
  wellName: string;
  type: 'cashflow' | 'impact';
  shares: number;
  totalInvestment: number;
  currentValue: number;
  apr: number;
  status: 'active' | 'matured' | 'pending';
  lastDividend: number;
  nextPayment: string;
  htsTokenId: string;
}

interface Cashflow {
  id: string;
  positionId: string;
  amount: number;
  date: string;
  type: 'dividend' | 'interest' | 'principal';
  status: 'eligible' | 'settlement' | 'claimed';
  hcsProofId: string;
  htsTransactionId: string;
}

const mockPositions: Position[] = [
  {
    id: 'pos-1',
    wellId: 'well-1',
    wellName: 'Borehole Jakarta Selatan #1',
    type: 'cashflow',
    shares: 1000,
    totalInvestment: 25000,
    currentValue: 27500,
    apr: 12.5,
    status: 'active',
    lastDividend: 312.5,
    nextPayment: '2024-02-15',
    htsTokenId: '0.0.1234567',
  },
  {
    id: 'pos-2',
    wellId: 'well-3',
    wellName: 'Artesian Well Bandung #3',
    type: 'cashflow',
    shares: 500,
    totalInvestment: 15000,
    currentValue: 16200,
    apr: 11.8,
    status: 'active',
    lastDividend: 177.0,
    nextPayment: '2024-02-20',
    htsTokenId: '0.0.2345678',
  },
  {
    id: 'pos-3',
    wellId: 'well-7',
    wellName: 'Community Well Yogyakarta #1',
    type: 'impact',
    shares: 200,
    totalInvestment: 8000,
    currentValue: 8000,
    apr: 0,
    status: 'active',
    lastDividend: 0,
    nextPayment: 'N/A',
    htsTokenId: '0.0.3456789',
  },
];

const mockCashflows: Cashflow[] = [
  {
    id: 'cf-1',
    positionId: 'pos-1',
    amount: 312.5,
    date: '2024-01-15',
    type: 'dividend',
    status: 'eligible',
    hcsProofId: '0.0.1001@1705123456.789',
    htsTransactionId: '0.0.1234567@1705123456.789',
  },
  {
    id: 'cf-2',
    positionId: 'pos-2',
    amount: 177.0,
    date: '2024-01-20',
    type: 'dividend',
    status: 'settlement',
    hcsProofId: '0.0.1002@1705555456.789',
    htsTransactionId: '0.0.2345678@1705555456.789',
  },
  {
    id: 'cf-3',
    positionId: 'pos-1',
    amount: 312.5,
    date: '2023-12-15',
    type: 'dividend',
    status: 'claimed',
    hcsProofId: '0.0.1003@1702123456.789',
    htsTransactionId: '0.0.1234567@1702123456.789',
  },
];

export function InvestorPortfolioClaim() {
  const [selectedTab, setSelectedTab] = useState('portfolio');
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const totalPortfolioValue = mockPositions.reduce(
    (sum, pos) => sum + pos.currentValue,
    0
  );
  const totalInvestment = mockPositions.reduce(
    (sum, pos) => sum + pos.totalInvestment,
    0
  );
  const totalReturn = totalPortfolioValue - totalInvestment;
  const avgAPR =
    mockPositions
      .filter(p => p.type === 'cashflow')
      .reduce((sum, pos) => sum + pos.apr, 0) /
    mockPositions.filter(p => p.type === 'cashflow').length;

  const eligibleCashflows = mockCashflows.filter(
    cf => cf.status === 'eligible'
  );
  const settlementCashflows = mockCashflows.filter(
    cf => cf.status === 'settlement'
  );
  const claimedCashflows = mockCashflows.filter(cf => cf.status === 'claimed');

  const handleClaim = async (cashflowId: string) => {
    setClaimingId(cashflowId);
    // Simulate claim process
    setTimeout(() => {
      setClaimingId(null);
      // Update cashflow status to claimed
    }, 2000);
  };

  const exportStatement = (format: 'csv' | 'json') => {
    // Simulate export
    console.log(`Exporting statement as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolio
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPortfolioValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +${totalReturn.toLocaleString()} (
              {((totalReturn / totalInvestment) * 100).toFixed(1)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average APR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAPR.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Cashflow wells only</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Claims
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {eligibleCashflows
                .reduce((sum, cf) => sum + cf.amount, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {eligibleCashflows.length} eligible payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Positions
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPositions.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockPositions.filter(p => p.type === 'cashflow').length}{' '}
              cashflow, {mockPositions.filter(p => p.type === 'impact').length}{' '}
              impact
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="cashflows">Cashflows</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Positions</CardTitle>
              <CardDescription>
                Your current well investments and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPositions.map(position => (
                  <div
                    key={position.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-semibold">{position.wellName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                position.type === 'cashflow'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {position.type}
                            </Badge>
                            <Badge
                              variant={
                                position.status === 'active'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {position.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          ${position.currentValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {position.shares.toLocaleString()} shares
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Investment</div>
                        <div className="font-medium">
                          ${position.totalInvestment.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">APR</div>
                        <div className="font-medium">{position.apr}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Last Dividend
                        </div>
                        <div className="font-medium">
                          ${position.lastDividend}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Next Payment
                        </div>
                        <div className="font-medium">
                          {position.nextPayment}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ProofPill
                        type="HTS"
                        id={position.htsTokenId}
                        label="Position Token"
                        variant="default"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflows" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Eligible Claims */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Eligible Claims
                </CardTitle>
                <CardDescription>Ready to claim</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eligibleCashflows.map(cashflow => {
                  const position = mockPositions.find(
                    p => p.id === cashflow.positionId
                  );
                  return (
                    <div
                      key={cashflow.id}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">${cashflow.amount}</div>
                          <div className="text-sm text-muted-foreground">
                            {position?.wellName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {cashflow.date}
                          </div>
                        </div>
                        <Badge variant="default">{cashflow.type}</Badge>
                      </div>

                      <div className="space-y-1">
                        <ProofPill
                          type="HCS"
                          id={cashflow.hcsProofId}
                          size="sm"
                        />
                        <ProofPill
                          type="HTS"
                          id={cashflow.htsTransactionId}
                          label="Transaction"
                          variant="warning"
                          size="sm"
                        />
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleClaim(cashflow.id)}
                        disabled={claimingId === cashflow.id}
                      >
                        {claimingId === cashflow.id
                          ? 'Claiming...'
                          : 'Claim Now'}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Settlement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  In Settlement
                </CardTitle>
                <CardDescription>Processing claims</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {settlementCashflows.map(cashflow => {
                  const position = mockPositions.find(
                    p => p.id === cashflow.positionId
                  );
                  return (
                    <div
                      key={cashflow.id}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">${cashflow.amount}</div>
                          <div className="text-sm text-muted-foreground">
                            {position?.wellName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {cashflow.date}
                          </div>
                        </div>
                        <Badge variant="secondary">{cashflow.type}</Badge>
                      </div>

                      <div className="space-y-1">
                        <ProofPill
                          type="HCS"
                          id={cashflow.hcsProofId}
                          label="Consensus"
                          size="sm"
                        />
                        <ProofPill
                          type="HTS"
                          id={cashflow.htsTransactionId}
                          label="Transaction"
                          variant="success"
                          size="sm"
                        />
                      </div>

                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Settlement in progress
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Claimed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  Claimed
                </CardTitle>
                <CardDescription>Completed payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {claimedCashflows.slice(0, 3).map(cashflow => {
                  const position = mockPositions.find(
                    p => p.id === cashflow.positionId
                  );
                  return (
                    <div
                      key={cashflow.id}
                      className="border rounded-lg p-3 space-y-2 opacity-75"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">${cashflow.amount}</div>
                          <div className="text-sm text-muted-foreground">
                            {position?.wellName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {cashflow.date}
                          </div>
                        </div>
                        <Badge variant="outline">{cashflow.type}</Badge>
                      </div>

                      <div className="space-y-1">
                        <ProofPill
                          type="HCS"
                          id={cashflow.hcsProofId}
                          label="Consensus"
                          size="sm"
                        />
                        <ProofPill
                          type="HTS"
                          id={cashflow.htsTransactionId}
                          label="Transaction"
                          variant="success"
                          size="sm"
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Export Statements
              </CardTitle>
              <CardDescription>
                Download your investment and cashflow statements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold">Portfolio Statement</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete overview of your positions, performance, and
                    transactions
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportStatement('csv')}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportStatement('json')}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      JSON
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold">Cashflow Statement</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed record of all dividend and interest payments
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportStatement('csv')}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportStatement('json')}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      JSON
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">Tax Documents</h4>
                <p className="text-sm text-muted-foreground">
                  Annual tax statements and supporting documentation for your
                  investments
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">2023 Tax Statement</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toast.success('Downloading 2023 Tax Statement (mock)')
                      }
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">2023 Dividend Summary</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toast.success(
                          'Downloading 2023 Dividend Summary (mock)'
                        )
                      }
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default InvestorPortfolioClaim;
