import ExploreMarketplace from '@/components/dashboard/explore-marketplace';

export default function ExplorePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const modeParam = (searchParams?.mode as string) || 'cashflow';
  const initialType = modeParam.toLowerCase() === 'impact' ? 'Impact' : 'Cashflow';
  return (
    <div className="container mx-auto py-8">
      <ExploreMarketplace initialType={initialType} />
    </div>
  );
}