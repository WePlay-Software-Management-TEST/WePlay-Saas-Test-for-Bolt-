import React from 'react';
import { type LatestSearchContextType } from './latestSearchContext.models';

export const LatestSearchContext = React.createContext<LatestSearchContextType | null>(null);

export const useLatestSearch = (): LatestSearchContextType => {
  const context = React.useContext(LatestSearchContext);
  if (context === null || context === undefined) {
    throw new Error(
      'useLatestSearch must be used within an LatestSearchProvider'
    );
  }
  return context;
};
