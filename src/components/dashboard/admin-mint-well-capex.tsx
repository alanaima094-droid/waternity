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
import ProofPill from '@/components/ui/proof-pill';
import {
  Plus,
  Upload,
  FileText,
  DollarSign,
  Link,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  Coins,
  Shield,
  Database,
  Users,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data untuk wells yang sudah ada
const existingWells = [
  {
    id: 'WELL-001',
    name: 'Bandung Aquifer Alpha',
    location: 'Bandung, West Java',
    status: 'ACTIVE',
    nftId: '0.0.456789',
    escrowId: '0.0.567890',
    deviceId: 'SENSOR-A1',
    contractor: 'PT Aqua Drill Indonesia',
  },
  {
    id: 'WELL-002',
    name: 'Jakarta Basin Beta',
    location: 'Jakarta, DKI Jakarta',
    status: 'MAINTENANCE',
    nftId: '0.0.456790',
    escrowId: '0.0.567891',
    deviceId: 'SENSOR-B2',
    contractor: 'CV Water Solutions',
  },
];

// Mock data untuk contractors
const contractors = [
  {
    id: 'CONT-001',
    name: 'PT Aqua Drill Indonesia',
    walletId: '0.0.111111',
    specialization: 'Deep Well Drilling',
    rating: 4.8,
    completedProjects: 45,
  },
  {
    id: 'CONT-002',
    name: 'CV Water Solutions',
    walletId: '0.0.222222',
    specialization: 'Water System Installation',
    rating: 4.6,
    completedProjects: 32,
  },
  {
    id: 'CONT-003',
    name: 'PT Hydro Engineering',
    walletId: '0.0.333333',
    specialization: 'IoT Device Integration',
    rating: 4.9,
    completedProjects: 28,
  },
];

// Mock data untuk pending transactions
const pendingTransactions = [
  {
    id: 'TX-001',
    type: 'MINT_NFT',
    wellId: 'WELL-003',
    status: 'PENDING',
    timestamp: '2024-01-15 14:30:00',
    txId: '0.0.123456@1705329000.123456789',
  },
  {
    id: 'TX-002',
    type: 'CREATE_ESCROW',
    wellId: 'WELL-003',
    amount: '50000 HBAR',
    status: 'CONFIRMED',
    timestamp: '2024-01-15 14:25:00',
    txId: '0.0.123457@1705328700.987654321',
  },
];

function AdminMintWellCapex() {
  const [activeTab, setActiveTab] = useState('mint-nft');
  const [selectedWell, setSelectedWell] = useState('');
  const [selectedContractor, setSelectedContractor] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [wellForm, setWellForm] = useState({
    name: '',
    location: '',
    coordinates: '',
    depth: '',
    capacity: '',
    description: '',
  });

  const [escrowForm, setEscrowForm] = useState({
    amount: '',
    contractor: '',
    milestones: '',
    duration: '',
  });

  const [payoutForm, setPayoutForm] = useState({
    contractor: '',
    amount: '',
    milestone: '',
    description: '',
  });

  const [deviceForm, setDeviceForm] = useState({
    deviceId: '',
    deviceType: '',
    wellId: '',
    calibrationData: '',
  });

  const handleMintNFT = async () => {
    setIsProcessing(true);
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Well NFT minted successfully!');
      // Reset form
      setWellForm({
        name: '',
        location: '',
        coordinates: '',
        depth: '',
        capacity: '',
        description: '',
      });
    } catch (error) {
      toast.error('Failed to mint NFT');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateEscrow = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Escrow contract created successfully!');
      setEscrowForm({
        amount: '',
        contractor: '',
        milestones: '',
        duration: '',
      });
    } catch (error) {
      toast.error('Failed to create escrow');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayoutContractor = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Contractor payment processed successfully!');
      setPayoutForm({
        contractor: '',
        amount: '',
        milestone: '',
        description: '',
      });
    } catch (error) {
      toast.error('Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBindDevice = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Device bound to well successfully!');
      setDeviceForm({
        deviceId: '',
        deviceType: '',
        wellId: '',
        calibrationData: '',
      });
    } catch (error) {
      toast.error('Failed to bind device');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'CONFIRMED':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'PENDING':
      case 'MAINTENANCE':
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
            Admin Control Panel
          </h2>
          <p className="text-muted-foreground">
            Mint new wells, manage escrows, and coordinate contractor operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">
            Admin Access
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Wells
                </p>
                <p className="text-2xl font-bold">
                  {existingWells.filter(w => w.status === 'ACTIVE').length}
                </p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Contractors
                </p>
                <p className="text-2xl font-bold">{contractors.length}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Tx
                </p>
                <p className="text-2xl font-bold">
                  {
                    pendingTransactions.filter(tx => tx.status === 'PENDING')
                      .length
                  }
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Escrow
                </p>
                <p className="text-2xl font-bold">150K</p>
                <p className="text-xs text-muted-foreground">HBAR</p>
              </div>
              <Coins className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="mint-nft">Mint NFT</TabsTrigger>
          <TabsTrigger value="create-escrow">Create Escrow</TabsTrigger>
          <TabsTrigger value="publish-docs">Publish Docs</TabsTrigger>
          <TabsTrigger value="payout">Payout</TabsTrigger>
          <TabsTrigger value="bind-device">Bind Device</TabsTrigger>
        </TabsList>

        <TabsContent value="mint-nft" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Mint New Well NFT
              </CardTitle>
              <CardDescription>
                Create a new well NFT with metadata and initial configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="well-name">Well Name</Label>
                  <Input
                    id="well-name"
                    placeholder="e.g., Surabaya Springs Gamma"
                    value={wellForm.name}
                    onChange={e =>
                      setWellForm({ ...wellForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="well-location">Location</Label>
                  <Input
                    id="well-location"
                    placeholder="e.g., Surabaya, East Java"
                    value={wellForm.location}
                    onChange={e =>
                      setWellForm({ ...wellForm, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinates">GPS Coordinates</Label>
                  <Input
                    id="coordinates"
                    placeholder="e.g., -7.2575, 112.7521"
                    value={wellForm.coordinates}
                    onChange={e =>
                      setWellForm({ ...wellForm, coordinates: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depth">Depth (meters)</Label>
                  <Input
                    id="depth"
                    type="number"
                    placeholder="e.g., 150"
                    value={wellForm.depth}
                    onChange={e =>
                      setWellForm({ ...wellForm, depth: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Daily Capacity (liters)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 5000"
                    value={wellForm.capacity}
                    onChange={e =>
                      setWellForm({ ...wellForm, capacity: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the well project..."
                  value={wellForm.description}
                  onChange={e =>
                    setWellForm({ ...wellForm, description: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleMintNFT}
                  disabled={
                    isProcessing || !wellForm.name || !wellForm.location
                  }
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isProcessing ? 'Minting...' : 'Mint Well NFT'}
                </Button>
                <ProofPill type="HTS" id="0.0.456791" label="Preview NFT" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-escrow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Create Escrow Contract
              </CardTitle>
              <CardDescription>
                Set up milestone-based payment escrow for contractors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="escrow-amount">Escrow Amount (HBAR)</Label>
                  <Input
                    id="escrow-amount"
                    type="number"
                    placeholder="e.g., 50000"
                    value={escrowForm.amount}
                    onChange={e =>
                      setEscrowForm({ ...escrowForm, amount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractor-select">Contractor</Label>
                  <select
                    id="contractor-select"
                    value={escrowForm.contractor}
                    onChange={e =>
                      setEscrowForm({
                        ...escrowForm,
                        contractor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select contractor...</option>
                    {contractors.map(contractor => (
                      <option key={contractor.id} value={contractor.id}>
                        {contractor.name} - {contractor.specialization}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 90"
                    value={escrowForm.duration}
                    onChange={e =>
                      setEscrowForm({ ...escrowForm, duration: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="milestones">Milestones & Payments</Label>
                <Textarea
                  id="milestones"
                  placeholder="e.g., 30% - Site preparation, 40% - Drilling completion, 30% - Testing & handover"
                  value={escrowForm.milestones}
                  onChange={e =>
                    setEscrowForm({ ...escrowForm, milestones: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleCreateEscrow}
                  disabled={
                    isProcessing || !escrowForm.amount || !escrowForm.contractor
                  }
                  className="flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  {isProcessing ? 'Creating...' : 'Create Escrow'}
                </Button>
                <ProofPill type="HTS" id="0.0.567892" label="Escrow Contract" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish-docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Publish Documentation
              </CardTitle>
              <CardDescription>
                Upload and publish project documents to HCS for transparency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Upload Documents</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop files or click to browse
                </p>
                <Button
                  variant="outline"
                  onClick={() => toast.message('File picker opened (mock)')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Document Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    'Environmental Impact',
                    'Technical Specs',
                    'Permits & Licenses',
                    'Financial Reports',
                  ].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <input type="checkbox" id={type} className="rounded" />
                      <label htmlFor={type} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className="flex items-center gap-2"
                  onClick={() =>
                    toast.success('Documents published to HCS (mock)')
                  }
                >
                  <FileText className="w-4 h-4" />
                  Publish to HCS
                </Button>
                <ProofPill type="HCS" id="0.0.789013" label="Document Hash" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Contractor Payout
              </CardTitle>
              <CardDescription>
                Process milestone payments to contractors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payout-contractor">Contractor</Label>
                  <select
                    id="payout-contractor"
                    value={payoutForm.contractor}
                    onChange={e =>
                      setPayoutForm({
                        ...payoutForm,
                        contractor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select contractor...</option>
                    {contractors.map(contractor => (
                      <option key={contractor.id} value={contractor.id}>
                        {contractor.name} - {contractor.walletId}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payout-amount">Amount (HBAR)</Label>
                  <Input
                    id="payout-amount"
                    type="number"
                    placeholder="e.g., 15000"
                    value={payoutForm.amount}
                    onChange={e =>
                      setPayoutForm({ ...payoutForm, amount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="milestone">Milestone</Label>
                  <select
                    id="milestone"
                    value={payoutForm.milestone}
                    onChange={e =>
                      setPayoutForm({
                        ...payoutForm,
                        milestone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select milestone...</option>
                    <option value="site-prep">Site Preparation (30%)</option>
                    <option value="drilling">Drilling Completion (40%)</option>
                    <option value="testing">Testing & Handover (30%)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-description">Payment Description</Label>
                <Textarea
                  id="payout-description"
                  placeholder="Description of completed work and milestone achieved..."
                  value={payoutForm.description}
                  onChange={e =>
                    setPayoutForm({
                      ...payoutForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handlePayoutContractor}
                  disabled={
                    isProcessing || !payoutForm.contractor || !payoutForm.amount
                  }
                  className="flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  {isProcessing ? 'Processing...' : 'Process Payment'}
                </Button>
                <ProofPill type="HTS" id="0.0.678901" label="Payment Tx" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bind-device" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Bind IoT Device
              </CardTitle>
              <CardDescription>
                Connect IoT sensors to wells for automated monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="device-id">Device ID</Label>
                  <Input
                    id="device-id"
                    placeholder="e.g., SENSOR-C3"
                    value={deviceForm.deviceId}
                    onChange={e =>
                      setDeviceForm({ ...deviceForm, deviceId: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="device-type">Device Type</Label>
                  <select
                    id="device-type"
                    value={deviceForm.deviceType}
                    onChange={e =>
                      setDeviceForm({
                        ...deviceForm,
                        deviceType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select device type...</option>
                    <option value="flow-sensor">Flow Rate Sensor</option>
                    <option value="quality-sensor">Water Quality Sensor</option>
                    <option value="pressure-sensor">Pressure Sensor</option>
                    <option value="multi-sensor">Multi-Parameter Sensor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bind-well">Target Well</Label>
                  <select
                    id="bind-well"
                    value={deviceForm.wellId}
                    onChange={e =>
                      setDeviceForm({ ...deviceForm, wellId: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select well...</option>
                    {existingWells.map(well => (
                      <option key={well.id} value={well.id}>
                        {well.id} - {well.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="calibration-data">Calibration Data</Label>
                <Textarea
                  id="calibration-data"
                  placeholder="Initial calibration parameters and baseline readings..."
                  value={deviceForm.calibrationData}
                  onChange={e =>
                    setDeviceForm({
                      ...deviceForm,
                      calibrationData: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleBindDevice}
                  disabled={
                    isProcessing || !deviceForm.deviceId || !deviceForm.wellId
                  }
                  className="flex items-center gap-2"
                >
                  <Link className="w-4 h-4" />
                  {isProcessing ? 'Binding...' : 'Bind Device'}
                </Button>
                <ProofPill type="HCS" id="0.0.789014" label="Device Binding" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admin Transactions</CardTitle>
          <CardDescription>
            Latest administrative actions and their blockchain proofs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTransactions.map(tx => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-medium">{tx.type.replace('_', ' ')}</p>
                    <p className="text-sm text-muted-foreground">
                      {tx.wellId} • {tx.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(tx.status)}
                  <ProofPill type="HTS" id={tx.txId} label="View Tx" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { AdminMintWellCapex };
export default AdminMintWellCapex;
