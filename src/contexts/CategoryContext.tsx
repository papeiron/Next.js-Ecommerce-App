'use client';

import { CategoryForSidebar } from '@/types';
import React, { createContext, ReactNode, useContext } from 'react';

interface CategoriesContextType {
  categories: CategoryForSidebar[];
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{
  children: ReactNode;
  categories: CategoryForSidebar[];
}> = ({ children, categories }) => {
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
