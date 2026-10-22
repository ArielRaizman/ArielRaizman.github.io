import { getGalleryTiles } from '$lib/server/data.js';

export function load() {
  return { galleries: getGalleryTiles() };
}
