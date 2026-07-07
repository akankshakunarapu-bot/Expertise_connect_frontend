import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { FilterSidebar, ExpertListItem, SortDropdown } from '../components/SearchWidgets';
import { EmptyState } from '@/components/ui/EmptyState';
import { EXPERTS } from '@/constants/dummy-data';
import type { Expert } from '@/types';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || searchParams.get('tech') || 'All Technologies';

  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState<any>({});
  const [results, setResults] = useState<Expert[]>(EXPERTS);

  useEffect(() => {
    let filtered = [...EXPERTS];

    // Filter by query / tech slug
    const searchVal = searchParams.get('q')?.toLowerCase();
    const techVal = searchParams.get('tech')?.toLowerCase();
    const catVal = searchParams.get('category')?.toLowerCase();

    if (searchVal) {
      filtered = filtered.filter(
        (exp) =>
          exp.fullName.toLowerCase().includes(searchVal) ||
          exp.title.toLowerCase().includes(searchVal) ||
          exp.technologies.some((t) => t.name.toLowerCase().includes(searchVal))
      );
    } else if (techVal) {
      filtered = filtered.filter((exp) =>
        exp.technologies.some((t) => t.slug === techVal)
      );
    } else if (catVal) {
      // Category matches
      filtered = filtered.filter((exp) =>
        exp.technologies.some((t) => t.category.toLowerCase() === catVal)
      );
    }

    // Apply sidebar filters
    if (filters.availableToday) {
      // For demo, John David is online/available
      filtered = filtered.filter((exp) => exp.id === 'e1' || exp.id === 'e3');
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (exp) => exp.hourlyRate >= filters.minPrice && exp.hourlyRate <= filters.maxPrice
      );
    }

    if (filters.experience && filters.experience.length > 0) {
      filtered = filtered.filter((exp) => {
        return filters.experience.some((range: string) => {
          if (range === '1-3') return exp.experience >= 1 && exp.experience <= 3;
          if (range === '3-5') return exp.experience >= 3 && exp.experience <= 5;
          if (range === '5-10') return exp.experience >= 5 && exp.experience <= 10;
          if (range === '10+') return exp.experience >= 10;
          return false;
        });
      });
    }

    if (filters.languages && filters.languages.length > 0) {
      filtered = filtered.filter((exp) =>
        exp.languages.some((l) => filters.languages.includes(l))
      );
    }

    // Apply sorting
    if (sortBy === 'price_low') {
      filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === 'price_high') {
      filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }

    setResults(filtered);
  }, [searchParams, filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={`Search Results for "${query}"`} description="Browse available tech mentors and book sessions." />
      <Navbar />

      <main className="flex-1 bg-gray-50 dark:bg-dark-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Search Results', href: '/search' },
              { label: query },
            ]}
          />

          {/* Heading Panel */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 select-none">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                Search Results for "{query}"
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {results.length} experts match your search criteria.
              </p>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Core Search Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar filter */}
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              className="lg:col-span-1"
            />

            {/* Results grid */}
            <div className="lg:col-span-3 space-y-6">
              {results.length > 0 ? (
                results.map((expert) => (
                  <ExpertListItem key={expert.id} expert={expert} />
                ))
              ) : (
                <EmptyState
                  title="No Experts Found"
                  description="We couldn't find any mentors matching your filters. Try clearing your parameters or updating your search query."
                  actionText="Reset All Filters"
                  onAction={() => setFilters({})}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default SearchPage;
