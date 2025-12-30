import React, { useEffect } from 'react';
import { type ImageCacheProviderProps, type ImageCacheContextType } from './imageCacheContext.models';
import { ImageCacheContext } from './imageCacheContext.consumer';
import { Storage } from 'aws-amplify';

const imageCache: Record<string, string> = {};

export default function ImageCacheProvider ({
  children
}: ImageCacheProviderProps): JSX.Element {
  async function getImageWithCache (
    imageKey: string
  ): Promise<string> {
    if (imageKey === '') throw new Error('Empty string provided to getImageWithCache');
    if (imageCache[imageKey]) {
      return imageCache[imageKey];
    } else {
      const s3Url = await Storage.get(imageKey).catch((err) => { console.info(err); });
      if (s3Url === undefined) { return ''; }
      const response = await fetch(s3Url).catch((err) => { console.info(err); });
      if (response === undefined) { return ''; }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache[imageKey] = objectUrl;
      return objectUrl;
    }
  }

  async function getImageFile (imageKey: string): Promise<File | undefined> {
    if (imageKey === '') return;

    if (imageCache[imageKey]) {
      const resp = await fetch(imageCache[imageKey]);
      const blob = await resp.blob();

      const file = new File([blob], `temp:${imageKey}`, { type: 'image/jpeg' });
      return file;
    } else {
      const s3Url = await Storage.get(imageKey);
      const response = await fetch(s3Url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache[imageKey] = objectUrl;

      const file = new File([blob], `temp:${imageKey}`, { type: 'image/jpeg' });
      return file;
    }
  }

  async function updateImageFile (imageKey: string): Promise<string> {
    if (imageKey === '') return '';
    if (imageCache[imageKey]) {
      const s3Url = await Storage.get(imageKey);
      const response = await fetch(s3Url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache[imageKey] = objectUrl;
      return objectUrl;
    } else {
      return await getImageWithCache(imageKey);
    }
  }

  /**
   * Returns true if we’ve already created & stored an object URL
   * for this key in our in-memory cache.
   */
  function hasImage (imageKey: string): boolean {
    return imageKey !== '' && imageCache[imageKey] !== undefined;
  }

  /**
   * Remove the given key from the cache, and revoke its object URL so we free up memory.
   */
  function clearImageFromCache (imageKey: string): void {
    const url = imageCache[imageKey];
    if (!url) return;
    URL.revokeObjectURL(url);
    Reflect.deleteProperty(imageCache, imageKey);
  }

  useEffect(() => {
    return () => {
      for (const id in imageCache) {
        if (Object.prototype.hasOwnProperty.call(imageCache, id)) {
          URL.revokeObjectURL(imageCache[id]);
        }
      }
    };
  }, []);

  const contextValue: ImageCacheContextType = {
    getImageWithCache,
    getImageFile,
    updateImageFile,
    hasImage,
    clearImageFromCache
  };

  return (
      <ImageCacheContext.Provider value={contextValue}>
          {children}
      </ImageCacheContext.Provider>
  );
};
