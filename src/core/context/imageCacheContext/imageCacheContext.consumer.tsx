import React from 'react';
import { type ImageCacheContextType } from './imageCacheContext.models';

// Amplify Storage Library returns signedURLs, which are automatically generated per request, which
// which makes the images uncachable using the browser builtin caching ability
// we are saving imageObjectURL using this context to cache images
// and reduce the resources we are consuming
// Read more here: https://github.com/aws-amplify/amplify-js/issues/9418

export const ImageCacheContext = React.createContext<ImageCacheContextType | null>(null);

export const useImageCache = (): ImageCacheContextType => {
  const context = React.useContext(ImageCacheContext);
  if (context === null || context === undefined) {
    throw new Error(
      'useImageCache must be used within an ImageCacheProvider'
    );
  }
  return context;
};
