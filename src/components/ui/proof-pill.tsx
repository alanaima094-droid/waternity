import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProofPillProps {
  type: 'HTS' | 'HCS';
  id: string;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProofPill: React.FC<ProofPillProps> = ({
  type,
  id,
  label,
  variant = 'default',
  size = 'md',
  className
}) => {
  const getUrl = () => {
    if (type === 'HTS') {
      return `https://hashscan.io/mainnet/transaction/${id}`;
    } else {
      return `https://mainnet.mirrornode.hedera.com/api/v1/topics/messages/${id}`;
    }
  };

  const handleClick = () => {
    window.open(getUrl(), '_blank', 'noopener,noreferrer');
  };

  const variantStyles = {
    default: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    success: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
    error: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const truncateId = (id: string) => {
    if (id.length <= 12) return id;
    return `${id.slice(0, 6)}...${id.slice(-6)}`;
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-mono transition-colors cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      title={`${type}: ${id} - Click to view on ${type === 'HTS' ? 'HashScan' : 'Hedera Mirror'}`}
    >
      <span className="font-semibold">{type}</span>
      <span className="opacity-75">:</span>
      <span>{label || truncateId(id)}</span>
      <ExternalLink className="w-3 h-3 opacity-60" />
    </button>
  );
};

export { ProofPill };
export default ProofPill;