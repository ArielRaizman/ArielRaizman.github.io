import { getSiteAssets } from '$lib/server/data.js';

// Shared banners are serialized as a URL, not the full media workspace.
export function load() {
  return { pageHeader: getSiteAssets().pageHeader };
}
