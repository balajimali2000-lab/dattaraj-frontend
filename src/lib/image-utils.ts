/**
 * Cloudinary Transformation Utility
 * Generates optimized image URLs for different jewelry display contexts
 */

type ImageVariant = 'thumbnail' | 'preview' | 'mobile' | 'full';

export const getProductImage = (image: any, preference: 'thumbnail' | 'low' | 'mid' | 'high' | 'veryHigh' = 'mid'): string => {
  if (!image) return '/placeholder-jewelry.png';

  const variants = ['thumbnail', 'low', 'mid', 'high', 'veryHigh'] as const;
  const prefIndex = variants.indexOf(preference);

  // 1. Try preferred
  if (image[preference]) return image[preference];

  // 2. Try higher quality fallback
  for (let i = prefIndex + 1; i < variants.length; i++) {
    if (image[variants[i]]) return image[variants[i]];
  }

  // 3. Try lower quality fallback
  for (let i = prefIndex - 1; i >= 0; i--) {
    if (image[variants[i]]) return image[variants[i]];
  }

  return '/placeholder-jewelry.png';
};

export const normalizeProductImages = (product: any) => {
  if (!product || !product.image) return product;

  const variants = ['thumbnail', 'low', 'mid', 'high', 'veryHigh'] as const;
  
  // Find the first available image
  let firstAvailable = '';
  for (const v of variants) {
    if (product.image[v]) {
      firstAvailable = product.image[v];
      break;
    }
  }

  if (!firstAvailable) return product;

  // Fill in blanks
  let lastAvailable = firstAvailable;
  for (const v of variants) {
    if (!product.image[v]) {
      product.image[v] = lastAvailable;
    } else {
      lastAvailable = product.image[v];
    }
  }

  return product;
};

export const getOptimizedImage = (url: string | undefined | null, variant: ImageVariant = 'preview'): string | undefined => {
  if (!url) return undefined;
  if (!url.includes('cloudinary.com')) return url;

  // Cloudinary transformations
  let transformations = 'f_auto,q_auto';

  switch (variant) {
    case 'thumbnail':
      transformations += ',w_300,h_300,c_fill';
      break;
    case 'mobile':
      transformations += ',w_600,h_400,c_fill';
      break;
    case 'preview':
      transformations += ',w_800,h_1000,c_fill';
      break;
    case 'full':
      break;
  }

  return url.replace('/upload/', `/upload/${transformations}/`);
};
