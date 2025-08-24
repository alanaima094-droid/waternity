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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockWells } from '@/lib/mock-data';
import {
  Settings,
  Wifi,
  AlertTriangle,
  DollarSign,
  Droplets,
  Thermometer,
  Battery,
  Signal,
  Download,
  Upload,
  Clock,
  CheckCircle,
  Zap,
} from 'lucide-react';
import ProofPill from '@/components/ui/proof-pill';
import { toast } from 'sonner';

function OperatorTariffDevice() {
  const [selectedWell, setSelectedWell] = useState(mockWells[0]);
  const [tariffRate, setTariffRate] = useState('0.025');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Mock device data
  const deviceData = {
    status: 'online',
    lastSync: '2 minutes ago',
    battery: 87,
    signal: 4,
    temperature: 24.5,
    flow: 125.3,
    pressure: 2.4,
    totalVolume: 15420,
  };

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Low battery detected on Well #247',
      timestamp: '5 minutes ago',
      hcsId: '0.0.123456-1234567890-001',
    },
    {
      id: 2,
      type: 'info',
      message: 'Maintenance scheduled for tomorrow',
      timestamp: '1 hour ago',
      hcsId: '0.0.123456-1234567890-002',
    },
    {
      id: 3,
      type: 'error',
      message: 'Connection lost to sensor array',
      timestamp: '3 hours ago',
      hcsId: '0.0.123456-1234567890-003',
    },
  ];

  const recentWithdrawals = [
    {
      amount: '$2,450.00',
      date: '2024-01-15',
      htsId: '0.0.789012-9876543210-001',
      status: 'completed',
    },
    {
      amount: '$1,875.50',
      date: '2024-01-10',
      htsId: '0.0.789012-9876543210-002',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Operator Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage tariffs, monitor devices, and handle withdrawals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Online
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="tariff" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tariff">Tariff Manager</TabsTrigger>
          <TabsTrigger value="device">Device Panel</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        {/* Tariff Manager */}
        <TabsContent value="tariff" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Current Tariff Settings
                </CardTitle>
                <CardDescription>
                  Manage pricing and billing parameters for your wells
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="well-select">Select Well</Label>
                  <select
                    id="well-select"
                    className="w-full p-2 border rounded-md"
                    value={selectedWell.id}
                    onChange={e =>
                      setSelectedWell(
                        mockWells.find(w => w.id === e.target.value) ||
                          mockWells[0]
                      )
                    }
                  >
                    {mockWells.map(well => (
                      <option key={well.id} value={well.id}>
                        {well.name} - {well.location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tariff-rate">Tariff Rate ($/liter)</Label>
                  <Input
                    id="tariff-rate"
                    type="number"
                    step="0.001"
                    value={tariffRate}
                    onChange={e => setTariffRate(e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Current Settings</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base Rate:</span>
                      <span className="font-mono">
                        ${selectedWell.pricePerLiter}/L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Volume:</span>
                      <span className="font-mono">
                        {selectedWell.monthlyVolume.toLocaleString()}L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue (30d):</span>
                      <span className="font-mono text-green-600">
                        $
                        {(
                          selectedWell.monthlyVolume *
                          selectedWell.pricePerLiter
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() =>
                    toast.success('Tariff updated successfully (mock)')
                  }
                >
                  Update Tariff Settings
                </Button>

                <div className="pt-2">
                  <ProofPill
                    type="HCS"
                    id="0.0.123456-1234567890-tariff"
                    label="Tariff Update Proof"
                    size="sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Performance metrics and projections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        $
                        {(
                          selectedWell.monthlyVolume *
                          selectedWell.pricePerLiter *
                          12
                        ).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Annual Revenue
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedWell.uptime}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Uptime
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>This Month:</span>
                      <span className="font-semibold">
                        $
                        {(
                          selectedWell.monthlyVolume *
                          selectedWell.pricePerLiter
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Month:</span>
                      <span className="font-semibold">
                        $
                        {(
                          selectedWell.monthlyVolume *
                          0.95 *
                          selectedWell.pricePerLiter
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth:</span>
                      <span className="font-semibold text-green-600">
                        +5.3%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Device Panel */}
        <TabsContent value="device" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  Device Status - {selectedWell.name}
                </CardTitle>
                <CardDescription>
                  Real-time monitoring and control
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Battery className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">
                      {deviceData.battery}%
                    </div>
                    <div className="text-xs text-muted-foreground">Battery</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Signal className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {deviceData.signal}/5
                    </div>
                    <div className="text-xs text-muted-foreground">Signal</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <Thermometer className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold">
                      {deviceData.temperature}°C
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Temperature
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <Droplets className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">{deviceData.flow}</div>
                    <div className="text-xs text-muted-foreground">L/min</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Device Status:</span>
                    <Badge variant="outline" className="bg-green-50">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Last Sync:</span>
                    <span className="text-sm">{deviceData.lastSync}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Volume Today:</span>
                    <span className="font-mono">
                      {deviceData.totalVolume.toLocaleString()}L
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <ProofPill
                    type="HCS"
                    id="0.0.123456-1234567890-device"
                    label="Device Status Proof"
                    size="sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Device control and maintenance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => toast.info('Device logs downloaded (mock)')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Logs
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => toast.success('Firmware uploaded (mock)')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Firmware
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => toast.warning('Device restarted (mock)')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Restart Device
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => toast.message('Maintenance scheduled (mock)')}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Maintenance
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Alerts
              </CardTitle>
              <CardDescription>
                Monitor and manage system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'error'
                          ? 'bg-red-500'
                          : alert.type === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-sm text-muted-foreground">
                        {alert.timestamp}
                      </div>
                      <div className="mt-2">
                        <ProofPill
                          type="HCS"
                          id={alert.hcsId}
                          label="Alert Proof"
                          size="sm"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toast.info('Alert marked as resolved (mock)')
                      }
                    >
                      Resolve
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdraw */}
        <TabsContent value="withdraw" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Withdraw Earnings
                </CardTitle>
                <CardDescription>
                  Transfer your earnings to your wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    $
                    {(
                      selectedWell.monthlyVolume *
                      selectedWell.pricePerLiter *
                      0.7
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Available Balance
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Withdrawal Amount ($)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-note">Note (Optional)</Label>
                  <Textarea
                    id="withdraw-note"
                    placeholder="Add a note for this withdrawal"
                    rows={3}
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={!withdrawAmount}
                  onClick={() =>
                    toast.success('Withdrawal request submitted (mock)')
                  }
                >
                  Request Withdrawal
                </Button>

                <div className="pt-2">
                  <ProofPill
                    type="HTS"
                    id="0.0.789012-9876543210-withdraw"
                    label="Withdrawal Proof"
                    size="sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Withdrawals</CardTitle>
                <CardDescription>
                  Transaction history and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWithdrawals.map((withdrawal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{withdrawal.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          {withdrawal.date}
                        </div>
                        <div className="mt-1">
                          <ProofPill
                            type="HTS"
                            id={withdrawal.htsId}
                            label="TX Proof"
                            size="sm"
                          />
                        </div>
                      </div>
                      <Badge
                        variant={
                          withdrawal.status === 'completed'
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          withdrawal.status === 'completed'
                            ? 'bg-green-50 text-green-700'
                            : ''
                        }
                      >
                        {withdrawal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { OperatorTariffDevice };
export default OperatorTariffDevice;
