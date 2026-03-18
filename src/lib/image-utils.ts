/**
 * Cloudinary Transformation Utility
 * Generates optimized image URLs for different jewelry display contexts
 */

type ImageVariant = 'thumbnail' | 'preview' | 'mobile' | 'full';

export const getOptimizedImage = (url: string | undefined | null, variant: ImageVariant = 'preview'): string | undefined => {
  if (!url) return undefined;
  if (!url.includes('cloudinary.com')) return url;

  // Cloudinary transformations
  // f_auto: auto format (WebP/AVIF)
  // q_auto: auto quality
  // c_fill: fill specified dimensions
  
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
      // Just auto format and quality
      break;
  }

  // Insert transformations into Cloudinary URL
  // Example: res.cloudinary.com/demo/image/upload/sample.jpg 
  // -> res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg
  return url.replace('/upload/', `/upload/${transformations}/`);
};
