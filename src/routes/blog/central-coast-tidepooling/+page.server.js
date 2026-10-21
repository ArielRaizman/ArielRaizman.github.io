import { getPhotoSrc } from '$lib/server/data.js';

export function load() {
  return {
    headerUrl: getPhotoSrc('tide.jpg'),
    sculpin: getPhotoSrc('PA200032.jpg'),
    shrimp: getPhotoSrc('PA190488.jpg'),
    spotted: getPhotoSrc('PA200090.jpg'),
    aeolid: getPhotoSrc('aeolid.jpg'),
    opalescent: getPhotoSrc('sonyopalescent.jpg'),
    sandalwood: getPhotoSrc('PB170683.jpg')
  };
}
