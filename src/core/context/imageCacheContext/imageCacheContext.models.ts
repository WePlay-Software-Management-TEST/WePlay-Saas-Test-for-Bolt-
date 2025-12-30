
export interface ImageCacheProviderProps {
  children: React.ReactNode
}
export interface ImageCacheContextType {
  getImageWithCache: (imageKey: string) => Promise<string>
  getImageFile: (imageKey: string) => Promise<File | undefined>
  updateImageFile: (imageKey: string) => Promise<string>
  hasImage: (key: string) => boolean
  clearImageFromCache: (key: string) => void
}
