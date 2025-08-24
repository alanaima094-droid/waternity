// Core types for Waternity application

export interface Well {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  capacity: number; // liters per day
  currentFlow: number;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WaterSale {
  id: string;
  wellId: string;
  amount: number; // liters
  price: number; // USDC
  timestamp: Date;
  txHash?: string; // Hedera transaction hash
  consensusId?: string; // HCS consensus ID
  deviceId: string;
  sessionId: string;
}

export interface User {
  id: string;
  walletAddress: string;
  role: 'user' | 'operator' | 'investor' | 'admin';
  name?: string;
  email?: string;
  createdAt: Date;
}

export interface Investment {
  id: string;
  investorId: string;
  wellId: string;
  amount: number; // USDC
  shares: number;
  timestamp: Date;
  txHash: string;
}

export interface ProofData {
  type: 'HTS' | 'HCS';
  hash: string;
  consensusId?: string;
  timestamp: Date;
  verified: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}