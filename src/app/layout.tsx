import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Waternity - Transparent Water Sales on Hedera',
    template: '%s | Waternity',
  },
  description:
    'Track water sales on-chain using Hedera for transparency, investor yield, and funding new water wells. Bridging water access with blockchain technology.',
  keywords: [
    'water',
    'blockchain',
    'hedera',
    'transparency',
    'investment',
    'africa',
    'sustainability',
    'web3',
  ],
  authors: [{ name: 'Waternity Team' }],
  creator: 'Waternity',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waternity.app',
    title: 'Waternity - Transparent Water Sales on Hedera',
    description:
      'Track water sales on-chain using Hedera for transparency, investor yield, and funding new water wells.',
    siteName: 'Waternity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waternity - Transparent Water Sales on Hedera',
    description:
      'Track water sales on-chain using Hedera for transparency, investor yield, and funding new water wells.',
    creator: '@waternity',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
