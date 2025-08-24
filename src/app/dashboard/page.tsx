'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ExploreMarketplace from '@/components/dashboard/explore-marketplace';
import WellLedger from '@/components/dashboard/well-ledger';
import UserBuyWater from '@/components/dashboard/user-buy-water';
import OperatorTariffDevice from '@/components/dashboard/operator-tariff-device';
import InvestorPortfolioClaim from '@/components/dashboard/investor-portfolio-claim';
import AuditPublicReadOnly from '@/components/dashboard/audit-public-readonly';
import AdminMintWellCapex from '@/components/dashboard/admin-mint-well-capex';
import {
  Search,
  User,
  Settings,
  TrendingUp,
  Shield,
  UserCheck,
  BarChart3,
  Droplets,
  DollarSign,
  Users,
} from 'lucide-react';

export default function DashboardPage() {
  // Deep-linking: control tabs via URL hash (#explore, #well-ledger, #user, #operator, #investor, #audit, #admin)
  const allowedTabs = [
    'explore',
    'well-ledger',
    'user',
    'operator',
    'investor',
    'audit',
    'admin',
  ] as const;
  const [activeTab, setActiveTab] = useState<string>('explore');

  useEffect(() => {
    const fromHash = (window.location.hash || '#explore').replace('#', '');
    if (allowedTabs.includes(fromHash as any)) {
      setActiveTab(fromHash);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const v = (window.location.hash || '#explore').replace('#', '');
      if (allowedTabs.includes(v as any)) setActiveTab(v);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
            Waternity Dashboard
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Manage your water resources and investments
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={v => {
            setActiveTab(v);
            history.replaceState(null, '', `#${v}`);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Explore
            </TabsTrigger>
            <TabsTrigger
              value="well-ledger"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Well Ledger
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              User
            </TabsTrigger>
            <TabsTrigger value="operator" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Operator
            </TabsTrigger>
            <TabsTrigger value="investor" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Investor
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Audit
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="mt-6" id="explore">
            <ExploreMarketplace />
          </TabsContent>

          <TabsContent value="well-ledger" className="mt-6" id="well-ledger">
            <WellLedger />
          </TabsContent>

          <TabsContent value="user" className="mt-6" id="user">
            <UserBuyWater />
          </TabsContent>

          <TabsContent value="operator" className="mt-6" id="operator">
            <OperatorTariffDevice />
          </TabsContent>

          <TabsContent value="investor" className="mt-6" id="investor">
            <InvestorPortfolioClaim />
          </TabsContent>

          <TabsContent value="audit" className="mt-6" id="audit">
            <AuditPublicReadOnly />
          </TabsContent>

          <TabsContent value="admin" className="mt-6" id="admin">
            <AdminMintWellCapex />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
