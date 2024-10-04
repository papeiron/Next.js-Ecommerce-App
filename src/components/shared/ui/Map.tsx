'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import MiniSpinner from './MiniSpinner';

const ClientSideMap = dynamic(() => import('./ClientSideMap'), {
  ssr: false,
  loading: () => <MiniSpinner />,
});

function Map() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ClientSideMap />;
}

export default Map;
