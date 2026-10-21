import { getBestPhotos, getSiteAssets } from '$lib/server/data.js';

export function load() {
  const { heroDesktop, heroMobile } = getSiteAssets();
  return { heroDesktop, heroMobile, bestImages: getBestPhotos() };
}
