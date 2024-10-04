'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';

import Input from './Input';
import { RxCross1 } from 'react-icons/rx';

function Search({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayTerm, setDisplayTerm] = useState<string>('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchTerm) {
        const params = new URLSearchParams(searchParams);
        setDisplayTerm(searchTerm);

        params.set('search', searchTerm);

        router.push(`${pathname}?${params.toString()}`);
      }
    }
  };

  const handleClick = () => {
    setSearchTerm('');
    setDisplayTerm('');

    const params = new URLSearchParams(searchParams);
    params.delete('search');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1">
      <Input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
      />
      {displayTerm && (
        <button
          onClick={handleClick}
          className="flex items-center gap-0.5 rounded border px-2 py-1 text-xs"
        >
          {displayTerm}
          <RxCross1 />
        </button>
      )}
    </div>
  );
}

export default Search;
