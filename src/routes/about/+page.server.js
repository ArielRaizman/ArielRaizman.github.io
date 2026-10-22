import { getSiteAssets } from '$lib/server/data.js';

export function load() {
  const { profile, story1Photos, story2Photos, childPhoto } = getSiteAssets();
  return { profile, story1Photos, story2Photos, childPhoto };
}
