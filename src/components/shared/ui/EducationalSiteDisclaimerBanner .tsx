'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function EducationalSiteDisclaimerBanner() {
  const [open, setOpen] = useState(true);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  if (!open || !portalContainer) return null;

  return createPortal(
    <div
      className="fixed bottom-2 right-2 mb-4 max-w-sm rounded-lg border border-red-500 bg-red-100 p-4 text-red-700 shadow-lg"
      role="alert"
    >
      <button
        onClick={() => setOpen(false)}
        className="absolute right-2 top-2 text-red-700 hover:text-red-900"
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <div className="mb-2 flex items-center">
        <AlertTriangle className="mr-2 h-5 w-5" />
        <p className="text-sm font-bold">Warning</p>
      </div>
      <p className="mt-1 text-xs">
        This website is not a real e-commerce platform. Any information or features
        presented here are not representative of actual transactions or services.
      </p>
    </div>,
    portalContainer,
  );
}

export default EducationalSiteDisclaimerBanner;
