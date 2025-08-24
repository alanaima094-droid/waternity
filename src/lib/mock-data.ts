// Mock data untuk 9 wells (6 Cashflow, 3 Impact)

export interface Well {
  id: string;
  name: string;
  type: 'Cashflow' | 'Impact';
  location: string;
  country: string;
  status: 'Active' | 'Pending' | 'Maintenance';
  apr: number;
  uptime: number;
  pricePerLiter: number;
  totalVolume: number;
  monthlyVolume: number;
  monthlyRevenue: number;
  peopleServed: number;
  wellPassportNFT: string;
  nftPassport: string; // Alias for wellPassportNFT
  operatorAddress: string;
  escrowAddress: string;
  deviceId: string;
  lastMaintenance: string;
  nextMaintenance: string;
  coordinates: { lat: number; lng: number };
  proofs: {
    hcs: string[];
    hts: string[];
  };
  documents: Array<{
    name: string;
    type: string;
    size: string;
    date: string;
  }>;
}

export interface Transaction {
  id: string;
  wellId: string;
  type:
    | 'deposit'
    | 'withdrawal'
    | 'settlement'
    | 'refund'
    | 'maintenance'
    | 'tariff_update';
  amount: number;
  timestamp: string;
  htsId?: string;
  hcsId?: string;
  status: 'confirmed' | 'pending' | 'failed';
  description: string;
}

export const mockWells: Well[] = [
  // 6 Cashflow Wells
  {
    id: 'well-001',
    name: 'Bandung Kios Alpha',
    type: 'Cashflow',
    location: 'Bandung, West Java',
    country: 'Indonesia',
    status: 'Active',
    apr: 12.5,
    uptime: 98.2,
    pricePerLiter: 0.05,
    totalVolume: 125000,
    monthlyVolume: 125000,
    monthlyRevenue: 6250,
    peopleServed: 850,
    wellPassportNFT: '0.0.123456',
    nftPassport: '0.0.123456',
    operatorAddress: '0.0.789012',
    escrowAddress: '0.0.345678',
    deviceId: 'BWA-001',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    coordinates: { lat: -6.9175, lng: 107.6191 },
    proofs: {
      hcs: [
        '1704067200.123456789',
        '1704153600.234567890',
        '1704240000.345678901',
      ],
      hts: [
        '0.0.987654-1704067200-1',
        '0.0.987654-1704153600-2',
        '0.0.987654-1704240000-3',
      ],
    },
    documents: [
      { name: 'Well Installation Report', type: 'PDF', size: '2.4 MB', date: '2024-01-15' },
      { name: 'Water Quality Certificate', type: 'PDF', size: '1.2 MB', date: '2024-01-20' },
      { name: 'Maintenance Schedule', type: 'PDF', size: '0.8 MB', date: '2024-01-10' },
    ],
  },
  {
    id: 'well-002',
    name: 'Jakarta Selatan Beta',
    type: 'Cashflow',
    location: 'South Jakarta, DKI Jakarta',
    country: 'Indonesia',
    status: 'Active',
    apr: 15.8,
    uptime: 96.7,
    pricePerLiter: 0.06,
    totalVolume: 98000,
    monthlyVolume: 98000,
    monthlyRevenue: 5880,
    peopleServed: 720,
    wellPassportNFT: '0.0.123457',
    nftPassport: '0.0.123457',
    operatorAddress: '0.0.789013',
    escrowAddress: '0.0.345679',
    deviceId: 'JSB-002',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-04-20',
    coordinates: { lat: -6.2615, lng: 106.8106 },
    proofs: {
      hcs: [
        '1704326400.456789012',
        '1704412800.567890123',
        '1704499200.678901234',
      ],
      hts: [
        '0.0.987655-1704326400-1',
        '0.0.987655-1704412800-2',
        '0.0.987655-1704499200-3',
      ],
    },
  },
  {
    id: 'well-003',
    name: 'Surabaya Gamma',
    type: 'Cashflow',
    location: 'Surabaya, East Java',
    country: 'Indonesia',
    status: 'Active',
    apr: 11.2,
    uptime: 99.1,
    pricePerLiter: 0.045,
    totalVolume: 156000,
    monthlyVolume: 156000,
    monthlyRevenue: 7020,
    peopleServed: 1100,
    wellPassportNFT: '0.0.123458',
    nftPassport: '0.0.123458',
    operatorAddress: '0.0.789014',
    escrowAddress: '0.0.345680',
    deviceId: 'SG-003',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10',
    coordinates: { lat: -7.2575, lng: 112.7521 },
    proofs: {
      hcs: [
        '1703980800.789012345',
        '1704067200.890123456',
        '1704153600.901234567',
      ],
      hts: [
        '0.0.987656-1703980800-1',
        '0.0.987656-1704067200-2',
        '0.0.987656-1704153600-3',
      ],
    },
  },
  {
    id: 'well-004',
    name: 'Medan Delta',
    type: 'Cashflow',
    location: 'Medan, North Sumatra',
    country: 'Indonesia',
    status: 'Maintenance',
    apr: 9.8,
    uptime: 94.5,
    pricePerLiter: 0.055,
    totalVolume: 87000,
    monthlyVolume: 87000,
    monthlyRevenue: 4785,
    peopleServed: 650,
    wellPassportNFT: '0.0.123459',
    nftPassport: '0.0.123459',
    operatorAddress: '0.0.789015',
    escrowAddress: '0.0.345681',
    deviceId: 'MD-004',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-02-15',
    coordinates: { lat: 3.5952, lng: 98.6722 },
    proofs: {
      hcs: [
        '1706745600.012345678',
        '1706832000.123456789',
        '1706918400.234567890',
      ],
      hts: [
        '0.0.987657-1706745600-1',
        '0.0.987657-1706832000-2',
        '0.0.987657-1706918400-3',
      ],
    },
  },
  {
    id: 'well-005',
    name: 'Yogyakarta Epsilon',
    type: 'Cashflow',
    location: 'Yogyakarta, DIY',
    country: 'Indonesia',
    status: 'Active',
    apr: 13.7,
    uptime: 97.8,
    pricePerLiter: 0.048,
    totalVolume: 112000,
    monthlyVolume: 112000,
    monthlyRevenue: 5376,
    peopleServed: 890,
    wellPassportNFT: '0.0.123460',
    nftPassport: '0.0.123460',
    operatorAddress: '0.0.789016',
    escrowAddress: '0.0.345682',
    deviceId: 'YE-005',
    lastMaintenance: '2024-01-25',
    nextMaintenance: '2024-04-25',
    coordinates: { lat: -7.7956, lng: 110.3695 },
    proofs: {
      hcs: [
        '1706140800.345678901',
        '1706227200.456789012',
        '1706313600.567890123',
      ],
      hts: [
        '0.0.987658-1706140800-1',
        '0.0.987658-1706227200-2',
        '0.0.987658-1706313600-3',
      ],
    },
  },
  {
    id: 'well-006',
    name: 'Makassar Zeta',
    type: 'Cashflow',
    location: 'Makassar, South Sulawesi',
    country: 'Indonesia',
    status: 'Active',
    apr: 14.3,
    uptime: 95.9,
    pricePerLiter: 0.052,
    totalVolume: 94000,
    monthlyVolume: 94000,
    monthlyRevenue: 4888,
    peopleServed: 780,
    wellPassportNFT: '0.0.123461',
    nftPassport: '0.0.123461',
    operatorAddress: '0.0.789017',
    escrowAddress: '0.0.345683',
    deviceId: 'MZ-006',
    lastMaintenance: '2024-01-18',
    nextMaintenance: '2024-04-18',
    coordinates: { lat: -5.1477, lng: 119.4327 },
    proofs: {
      hcs: [
        '1705536000.678901234',
        '1705622400.789012345',
        '1705708800.890123456',
      ],
      hts: [
        '0.0.987659-1705536000-1',
        '0.0.987659-1705622400-2',
        '0.0.987659-1705708800-3',
      ],
    },
  },
  // 3 Impact Wells
  {
    id: 'well-007',
    name: 'Rural Lombok Impact',
    type: 'Impact',
    location: 'Central Lombok, NTB',
    country: 'Indonesia',
    status: 'Active',
    apr: 0, // Impact wells don't generate direct returns
    uptime: 92.3,
    pricePerLiter: 0.02, // Subsidized pricing
    totalVolume: 45000,
    monthlyVolume: 45000,
    monthlyRevenue: 900,
    peopleServed: 1200,
    wellPassportNFT: '0.0.123462',
    nftPassport: '0.0.123462',
    operatorAddress: '0.0.789018',
    escrowAddress: '0.0.345684',
    deviceId: 'RLI-007',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-04-12',
    coordinates: { lat: -8.65, lng: 116.3242 },
    proofs: {
      hcs: [
        '1704240000.901234567',
        '1704326400.012345678',
        '1704412800.123456789',
      ],
      hts: [
        '0.0.987660-1704240000-1',
        '0.0.987660-1704326400-2',
        '0.0.987660-1704412800-3',
      ],
    },
  },
  {
    id: 'well-008',
    name: 'Papua Community Well',
    type: 'Impact',
    location: 'Jayapura, Papua',
    country: 'Indonesia',
    status: 'Pending',
    apr: 0,
    uptime: 0, // Not yet operational
    pricePerLiter: 0.015,
    totalVolume: 0,
    monthlyVolume: 0,
    monthlyRevenue: 0,
    peopleServed: 0, // Target: 800
    wellPassportNFT: '0.0.123463',
    nftPassport: '0.0.123463',
    operatorAddress: '0.0.789019',
    escrowAddress: '0.0.345685',
    deviceId: 'PCW-008',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-03-01',
    coordinates: { lat: -2.5489, lng: 140.7197 },
    proofs: {
      hcs: ['1706832000.234567890', '1706918400.345678901'],
      hts: ['0.0.987661-1706832000-1', '0.0.987661-1706918400-2'],
    },
  },
  {
    id: 'well-009',
    name: 'Flores Island Relief',
    type: 'Impact',
    location: 'Ende, East Nusa Tenggara',
    country: 'Indonesia',
    status: 'Active',
    apr: 0,
    uptime: 88.7,
    pricePerLiter: 0.01,
    totalVolume: 32000,
    monthlyVolume: 32000,
    monthlyRevenue: 320,
    peopleServed: 950,
    wellPassportNFT: '0.0.123464',
    nftPassport: '0.0.123464',
    operatorAddress: '0.0.789020',
    escrowAddress: '0.0.345686',
    deviceId: 'FIR-009',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-04-08',
    coordinates: { lat: -8.8476, lng: 121.6619 },
    proofs: {
      hcs: [
        '1704499200.456789012',
        '1704585600.567890123',
        '1704672000.678901234',
      ],
      hts: [
        '0.0.987662-1704499200-1',
        '0.0.987662-1704585600-2',
        '0.0.987662-1704672000-3',
      ],
    },
  },
];

export const mockTransactions: Transaction[] = [
  // Transactions for well-001
  {
    id: 'tx-001',
    wellId: 'well-001',
    type: 'deposit',
    amount: 1000,
    timestamp: '2024-01-15T10:30:00Z',
    htsId: '0.0.987654-1704067200-1',
    hcsId: '1704067200.123456789',
    status: 'confirmed',
    description: 'User deposit for water purchase',
  },
  {
    id: 'tx-002',
    wellId: 'well-001',
    type: 'withdrawal',
    amount: 850,
    timestamp: '2024-01-16T14:20:00Z',
    htsId: '0.0.987654-1704153600-2',
    hcsId: '1704153600.234567890',
    status: 'confirmed',
    description: 'Water dispensed - 17 liters',
  },
  {
    id: 'tx-003',
    wellId: 'well-001',
    type: 'refund',
    amount: 150,
    timestamp: '2024-01-17T09:15:00Z',
    htsId: '0.0.987654-1704240000-3',
    hcsId: '1704240000.345678901',
    status: 'confirmed',
    description: 'Automatic refund - unused balance',
  },
  // Transactions for well-002
  {
    id: 'tx-004',
    wellId: 'well-002',
    type: 'settlement',
    amount: 5880,
    timestamp: '2024-01-20T16:45:00Z',
    htsId: '0.0.987655-1704326400-1',
    hcsId: '1704326400.456789012',
    status: 'confirmed',
    description: 'Monthly revenue settlement',
  },
  {
    id: 'tx-005',
    wellId: 'well-002',
    type: 'tariff_update',
    amount: 0,
    timestamp: '2024-01-21T11:30:00Z',
    htsId: '0.0.987655-1704412800-2',
    hcsId: '1704412800.567890123',
    status: 'confirmed',
    description: 'Tariff updated: 0.06 → 0.065 per liter',
  },
  // Transactions for well-007 (Impact)
  {
    id: 'tx-006',
    wellId: 'well-007',
    type: 'maintenance',
    amount: 2500,
    timestamp: '2024-01-12T08:00:00Z',
    htsId: '0.0.987660-1704240000-1',
    hcsId: '1704240000.901234567',
    status: 'confirmed',
    description: 'Scheduled maintenance - filter replacement',
  },
  {
    id: 'tx-007',
    wellId: 'well-008',
    type: 'deposit',
    amount: 50000,
    timestamp: '2024-02-01T12:00:00Z',
    htsId: '0.0.987661-1706832000-1',
    hcsId: '1706832000.234567890',
    status: 'confirmed',
    description: 'Initial funding for well construction',
  },
];

// Helper functions
export const getWellsByType = (type: 'Cashflow' | 'Impact') => {
  return mockWells.filter(well => well.type === type);
};

export const getWellById = (id: string) => {
  return mockWells.find(well => well.id === id);
};

export const getTransactionsByWellId = (wellId: string) => {
  return mockTransactions.filter(tx => tx.wellId === wellId);
};

export const getActiveWells = () => {
  return mockWells.filter(well => well.status === 'Active');
};

export const getTotalStats = () => {
  const activeWells = getActiveWells();
  return {
    totalWells: mockWells.length,
    activeWells: activeWells.length,
    totalPeopleServed: mockWells.reduce(
      (sum, well) => sum + well.peopleServed,
      0
    ),
    totalMonthlyRevenue: activeWells.reduce(
      (sum, well) => sum + well.monthlyRevenue,
      0
    ),
    averageAPR:
      activeWells
        .filter(w => w.type === 'Cashflow')
        .reduce((sum, well) => sum + well.apr, 0) /
      activeWells.filter(w => w.type === 'Cashflow').length,
    averageUptime:
      activeWells.reduce((sum, well) => sum + well.uptime, 0) /
      activeWells.length,
  };
};
