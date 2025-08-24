'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProofPill from '@/components/ui/proof-pill';
import { mockWells, getWellById } from '@/lib/mock-data';
import {
  Wallet,
  Droplets,
  RefreshCw,
  Receipt,
  CreditCard,
  ArrowRight,
  Download,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';

const UserBuyWater = () => {
  const [selectedWellId, setSelectedWellId] = useState('well-001');
  const [currentStep, setCurrentStep] = useState<
    'deposit' | 'liter' | 'refund'
  >('deposit');
  const [showReceiptDrawer, setShowReceiptDrawer] = useState(false);
  const [userBalance, setUserBalance] = useState(125.5);
  const [sessionData, setSessionData] = useState({
    litersDispensed: 0,
    amountSpent: 0,
    sessionStart: null as Date | null,
    sessionEnd: null as Date | null,
    transactions: [] as any[],
  });

  const selectedWell = getWellById(selectedWellId);
  const [depositAmount, setDepositAmount] = useState('');
  const [literAmount, setLiterAmount] = useState('');
  const [refundAmount, setRefundAmount] = useState('');

  if (!selectedWell) return null;

  const BalanceCard = () => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Water Credit Balance</h3>
          <div className="text-3xl font-bold">${userBalance.toFixed(2)}</div>
          <div className="text-blue-100 text-sm mt-1">
            ≈ {(userBalance / selectedWell.pricePerLiter).toFixed(1)} liters
            available
          </div>
        </div>
        <Wallet className="h-8 w-8 text-blue-200" />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setCurrentStep('deposit')}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          size="sm"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Top Up
        </Button>
        <Button
          onClick={() => setCurrentStep('refund')}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refund
        </Button>
        <Button
          onClick={() => setShowReceiptDrawer(true)}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          size="sm"
        >
          <Receipt className="h-4 w-4 mr-2" />
          Receipts
        </Button>
      </div>
    </div>
  );

  const SessionPanel = () => (
    <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))] mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          Current Session
        </h3>
        <Badge
          className={
            sessionData.sessionStart
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }
        >
          {sessionData.sessionStart ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
          <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {sessionData.litersDispensed.toFixed(1)}L
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Dispensed
          </div>
        </div>

        <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
          <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
            ${sessionData.amountSpent.toFixed(2)}
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Spent
          </div>
        </div>

        <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
          <Clock className="h-6 w-6 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {sessionData.sessionStart
              ? Math.floor(
                  (Date.now() - sessionData.sessionStart.getTime()) / 60000
                )
              : 0}
            m
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Duration
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setCurrentStep('liter')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={userBalance < selectedWell.pricePerLiter}
        >
          <Droplets className="h-4 w-4 mr-2" />
          Buy Water
        </Button>
      </div>
    </div>
  );

  const DepositFlow = () => (
    <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
        Deposit Funds
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Deposit Amount (USD)
          </label>
          <input
            type="number"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
          />
          {depositAmount && (
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              ≈{' '}
              {(parseFloat(depositAmount) / selectedWell.pricePerLiter).toFixed(
                1
              )}{' '}
              liters
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[25, 50, 100].map(amount => (
            <Button
              key={amount}
              onClick={() => setDepositAmount(amount.toString())}
              variant="outline"
              size="sm"
            >
              ${amount}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => {
            if (depositAmount) {
              const amount = parseFloat(depositAmount);
              setUserBalance(prev => prev + amount);
              setDepositAmount('');
              // Simulate HTS transaction
              const newTransaction = {
                id: `tx-${Date.now()}`,
                type: 'deposit',
                amount: amount,
                timestamp: new Date().toISOString(),
                description: `Deposit $${amount}`,
                status: 'confirmed',
                htsId: `0.0.${Math.floor(Math.random() * 1000000)}`,
                hcsId: `${Math.floor(Date.now() / 1000)}.deposit${Math.floor(Math.random() * 1000)}`,
              };
              setSessionData(prev => ({
                ...prev,
                transactions: [newTransaction, ...prev.transactions],
              }));
            }
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!depositAmount || parseFloat(depositAmount) <= 0}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Deposit ${depositAmount || '0'}
        </Button>

        {sessionData.transactions
          .filter(tx => tx.type === 'deposit')
          .slice(0, 3)
          .map(tx => (
            <div
              key={tx.id}
              className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-lg"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <div className="font-medium">{tx.description}</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <ProofPill type="HCS" id={tx.hcsId} size="sm" />
                <ProofPill type="HTS" id={tx.htsId} size="sm" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const LiterFlow = () => {
    const handleBuyWater = () => {
      if (literAmount) {
        const liters = parseFloat(literAmount);
        const cost = liters * selectedWell.pricePerLiter;

        if (cost <= userBalance) {
          setUserBalance(prev => prev - cost);
          setSessionData(prev => {
            const newTransaction = {
              id: `tx-${Date.now()}`,
              type: 'withdrawal',
              amount: cost,
              timestamp: new Date().toISOString(),
              description: `Purchased ${liters}L water`,
              status: 'confirmed',
              htsId: `0.0.${Math.floor(Math.random() * 1000000)}`,
              hcsId: `${Math.floor(Date.now() / 1000)}.water${Math.floor(Math.random() * 1000)}`,
            };

            return {
              ...prev,
              litersDispensed: prev.litersDispensed + liters,
              amountSpent: prev.amountSpent + cost,
              sessionStart: prev.sessionStart || new Date(),
              transactions: [newTransaction, ...prev.transactions],
            };
          });
          setLiterAmount('');
        }
      }
    };

    return (
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Buy Water from {selectedWell.name}
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] mb-4">
            <MapPin className="h-4 w-4" />
            <span>{selectedWell.location}</span>
            <Badge className="ml-2">
              ${selectedWell.pricePerLiter.toFixed(3)}/L
            </Badge>
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              Liters to Purchase
            </label>
            <input
              type="number"
              value={literAmount}
              onChange={e => setLiterAmount(e.target.value)}
              placeholder="Enter liters"
              className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
            />
            {literAmount && (
              <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                Cost: $
                {(parseFloat(literAmount) * selectedWell.pricePerLiter).toFixed(
                  2
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 5, 10, 20].map(amount => (
              <Button
                key={amount}
                onClick={() => setLiterAmount(amount.toString())}
                variant="outline"
                size="sm"
              >
                {amount}L
              </Button>
            ))}
          </div>

          <Button
            onClick={handleBuyWater}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={
              !literAmount ||
              parseFloat(literAmount) <= 0 ||
              parseFloat(literAmount) * selectedWell.pricePerLiter > userBalance
            }
          >
            <Droplets className="h-4 w-4 mr-2" />
            Buy {literAmount || '0'}L for $
            {literAmount
              ? (parseFloat(literAmount) * selectedWell.pricePerLiter).toFixed(
                  2
                )
              : '0.00'}
          </Button>

          {sessionData.transactions
            .filter(tx => tx.type === 'withdrawal')
            .slice(0, 3)
            .map(tx => (
              <div
                key={tx.id}
                className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-lg"
              >
                <Droplets className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">
                    {new Date(tx.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <ProofPill type="HCS" id={tx.hcsId} size="sm" />
                  <ProofPill type="HTS" id={tx.htsId} size="sm" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const RefundFlow = () => (
    <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-[hsl(var(--border))]">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
        Request Refund
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">Refund Policy</span>
          </div>
          <div className="text-sm text-yellow-700">
            Refunds are processed within 24-48 hours. A 2% processing fee
            applies.
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Refund Amount (USD)
          </label>
          <input
            type="number"
            value={refundAmount}
            onChange={e => setRefundAmount(e.target.value)}
            placeholder="Enter amount"
            max={userBalance}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
          />
          {refundAmount && (
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Processing fee: ${(parseFloat(refundAmount) * 0.02).toFixed(2)} |
              You&apos;ll receive: $
              {(parseFloat(refundAmount) * 0.98).toFixed(2)}
            </div>
          )}
        </div>

        <Button
          onClick={() => {
            setRefundAmount(userBalance.toString());
          }}
          variant="outline"
          size="sm"
        >
          Refund All (${userBalance.toFixed(2)})
        </Button>

        <Button
          onClick={() => {
            if (refundAmount) {
              const amount = parseFloat(refundAmount);
              const fee = amount * 0.02;
              const netRefund = amount - fee;

              setUserBalance(prev => prev - amount);
              setRefundAmount('');

              const newTransaction = {
                id: `tx-${Date.now()}`,
                type: 'refund',
                amount: amount,
                timestamp: new Date().toISOString(),
                description: `Refund $${netRefund.toFixed(2)} (fee: $${fee.toFixed(2)})`,
                status: 'pending',
                htsId: `0.0.${Math.floor(Math.random() * 1000000)}`,
                hcsId: `${Math.floor(Date.now() / 1000)}.refund${Math.floor(Math.random() * 1000)}`,
              };

              setSessionData(prev => ({
                ...prev,
                transactions: [newTransaction, ...prev.transactions],
              }));
            }
          }}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          disabled={
            !refundAmount ||
            parseFloat(refundAmount) <= 0 ||
            parseFloat(refundAmount) > userBalance
          }
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Request Refund
        </Button>

        {sessionData.transactions
          .filter(tx => tx.type === 'refund')
          .slice(0, 3)
          .map(tx => (
            <div
              key={tx.id}
              className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-lg"
            >
              <RefreshCw className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <div className="font-medium">{tx.description}</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
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
              <div className="flex gap-2">
                <ProofPill type="HCS" id={tx.hcsId} size="sm" />
                <ProofPill type="HTS" id={tx.htsId} size="sm" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const ReceiptDrawer = () => {
    if (!showReceiptDrawer) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-[hsl(var(--background))] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-[hsl(var(--border))]">
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Transaction Receipts
            </h3>
            <Button
              onClick={() => setShowReceiptDrawer(false)}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4">
              {sessionData.transactions.map(tx => (
                <div
                  key={tx.id}
                  className="bg-[hsl(var(--card))] p-4 rounded-lg border border-[hsl(var(--border))]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium text-[hsl(var(--foreground))]">
                        {tx.description}
                      </div>
                      <div className="text-sm text-[hsl(var(--muted-foreground))]">
                        {new Date(tx.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[hsl(var(--foreground))]">
                        ${tx.amount.toFixed(2)}
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
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <ProofPill type="HCS" id={tx.hcsId} size="sm" />
                      <ProofPill type="HTS" id={tx.htsId} size="sm" />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success('Receipt downloaded (mock)')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}

              {sessionData.transactions.length === 0 && (
                <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">
                  No transactions yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
            Buy Water
          </h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            Deposit funds, purchase water, and manage refunds
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedWellId}
            onChange={e => setSelectedWellId(e.target.value)}
            className="px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))]"
          >
            {mockWells
              .filter(well => well.status === 'Active')
              .map(well => (
                <option key={well.id} value={well.id}>
                  {well.name} - ${well.pricePerLiter.toFixed(3)}/L
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Balance Card */}
      <BalanceCard />

      {/* Session Panel */}
      <SessionPanel />

      {/* Flow Navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4 p-4 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
          <Button
            onClick={() => setCurrentStep('deposit')}
            variant={currentStep === 'deposit' ? 'default' : 'outline'}
            size="sm"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Deposit
          </Button>
          <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Button
            onClick={() => setCurrentStep('liter')}
            variant={currentStep === 'liter' ? 'default' : 'outline'}
            size="sm"
          >
            <Droplets className="h-4 w-4 mr-2" />
            Buy Water
          </Button>
          <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Button
            onClick={() => setCurrentStep('refund')}
            variant={currentStep === 'refund' ? 'default' : 'outline'}
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refund
          </Button>
        </div>
      </div>

      {/* Current Flow */}
      {currentStep === 'deposit' && <DepositFlow />}
      {currentStep === 'liter' && <LiterFlow />}
      {currentStep === 'refund' && <RefundFlow />}

      {/* Receipt Drawer */}
      <ReceiptDrawer />
    </div>
  );
};

export default UserBuyWater;
