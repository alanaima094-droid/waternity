import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatNumber, truncateAddress } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });
  });

  describe('truncateAddress', () => {
    it('should truncate address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      expect(truncateAddress(address)).toBe('0x1234...5678');
      expect(truncateAddress(address, 6)).toBe('0x123456...345678');
    });
  });
});
