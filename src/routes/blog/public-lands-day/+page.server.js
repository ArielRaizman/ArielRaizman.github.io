import { getPhotoSrc } from '$lib/server/data.js';

export function load() {
  return {
    headerUrl: getPhotoSrc('_DSC8955.jpg'),
    photo1: getPhotoSrc('_DSC8955.jpg'),
    photo2: getPhotoSrc('_DSC9948.jpg'),
    photo3: getPhotoSrc('_DSC0498.jpg'),
    photo4: getPhotoSrc('_DSC1926.jpg'),
    photo5: getPhotoSrc('_DSC1857.jpg'),
    photo6: getPhotoSrc('_DSC2598-Enhanced-NR.jpg'),
    photo7: getPhotoSrc('_DSC1691-2.jpg'),
    photo8: getPhotoSrc('_DSC8303-Enhanced-NR.jpg')
  };
}
