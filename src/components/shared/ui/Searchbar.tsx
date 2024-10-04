'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, X, Clock, Tag, Store } from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';
import { recordSearchQuery, deleteSearchHistory } from '@/actions/search';
import { SearchHistory } from '@prisma/client';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchResults } from '@/types/Search';

function EnhancedSearchbar({
  searchHistory,
}: {
  searchHistory: SearchHistory[] | undefined;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{ results: SearchResults } | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    async function fetchResults() {
      if (debouncedSearchTerm) {
        const res = await fetch(`/api/s?q=${debouncedSearchTerm}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        }
      } else {
        setResults(null);
      }
    }
    fetchResults();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setIsOpen(false);
    if (user && searchTerm) {
      await recordSearchQuery(searchTerm);
    }
    router.push(`/search?q=${searchTerm}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, categories, stores..."
          className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isOpen && (searchTerm || (searchHistory && searchHistory.length > 0)) && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {results ? (
            <div className="p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Search Results</h3>
              <div className="space-y-2">
                {results.results.products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/p/${p.slug}`}
                    className="flex items-center rounded-md p-2 hover:bg-gray-50"
                  >
                    <Tag size={16} className="mr-2 text-orange-500" />
                    <span className="text-sm text-gray-700">{p.name}</span>
                    <span className="ml-auto text-xs text-gray-500">Product</span>
                  </Link>
                ))}
                {results.results.categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/c/${c.slug}`}
                    className="flex items-center rounded-md p-2 hover:bg-gray-50"
                  >
                    <Tag size={16} className="mr-2 text-green-500" />
                    <span className="text-sm text-gray-700">{c.name}</span>
                    <span className="ml-auto text-xs text-gray-500">Category</span>
                  </Link>
                ))}
                {results.results.stores.map((s) => (
                  <Link
                    key={s.id}
                    href={`/s/${s.slug}`}
                    className="flex items-center rounded-md p-2 hover:bg-gray-50"
                  >
                    <Store size={16} className="mr-2 text-blue-500" />
                    <span className="text-sm text-gray-700">{s.store_name}</span>
                    <span className="ml-auto text-xs text-gray-500">Store</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : searchHistory && searchHistory.length > 0 ? (
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Recent Searches</h3>
                <form action={deleteSearchHistory}>
                  <button className="text-xs text-orange-500 hover:text-orange-600">
                    Clear All
                  </button>
                </form>
              </div>
              <div className="space-y-2">
                {searchHistory.map((h) => (
                  <Link
                    key={h.id}
                    href={`/search?q=${h.query}`}
                    className="flex items-center rounded-md p-2 hover:bg-gray-50"
                  >
                    <Clock size={16} className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-700">{h.query}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default EnhancedSearchbar;
