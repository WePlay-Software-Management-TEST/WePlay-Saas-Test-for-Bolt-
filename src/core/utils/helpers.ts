import { isSafariBrowser } from 'core/context/regex.const';
import { type PixelCrop } from 'react-image-crop';

const TO_RADIANS = Math.PI / 180;

export function canvasPreview (
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
): void {
  if (canvas === null) {
    throw new Error('Canvas ref is "null"');
  };

  const ctx = canvas.getContext('2d');

  if (ctx === undefined || ctx === null) {
    throw new Error('No 2d context');
  };

  if (image === null) {
    throw new Error('Image ref is "null"');
  };

  const imgNaturalHeight = image.naturalHeight;
  const imgNaturalWidth = image.naturalWidth;

  const scaleX = imgNaturalWidth / image.width;
  const scaleY = imgNaturalHeight / image.height;
  // Slower rendering time, but higher image resolution (As close to the natural image resolution).
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  if (isSafariBrowser.test(navigator.userAgent)) {
    if (canvas.height > 4096) {
      canvas.height = 4096;
    }
    if (canvas.width > 4096) {
      canvas.width = 4096;
    }
  };

  ctx?.scale(pixelRatio, pixelRatio);

  if (!isSafariBrowser.test(navigator.userAgent)) {
    ctx.imageSmoothingQuality = 'high';
  };

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = imgNaturalWidth / 2;
  const centerY = imgNaturalHeight / 2;
  ctx?.save();

  // Move the crop origin to the canvas origin (0,0)
  ctx?.translate(-cropX, -cropY);
  // Move the origin to the center of the original position
  ctx?.translate(centerX, centerY);
  // Rotate around the origin
  ctx?.rotate(rotateRads);
  // Scale the image
  ctx?.scale(scale, scale);
  // Move the center of the image to the origin (0,0)
  ctx?.translate(-centerX, -centerY);

  ctx?.drawImage(
    image,
    0,
    0,
    imgNaturalWidth,
    imgNaturalHeight,
    0,
    0,
    imgNaturalWidth,
    imgNaturalHeight
  );

  ctx?.restore();
}

/**
 * @function Get Max Width or Height that is supported in IOS Safari. Which is maxed at 4096 * 4096.
 * @param {number } pixelRatio - PixelRaio of device.
 * @param {number } naturalMeasure - Natural Measure of image.
 * @param {number } imgMeasure - Canvas Measure of image.
 * @returns { number } Max amount that can be alloted for an IOS device.
 * */
export function getSafariMaxWH (
  pixelRatio: number, naturalMeasure: number, imgMeasure: number): number {
  return (4096 / (pixelRatio * (naturalMeasure / imgMeasure)));
};
