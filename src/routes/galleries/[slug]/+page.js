import { error } from '@sveltejs/kit';
import { getGallery, getGallerySlugs } from '$lib/data.js';

export function load({ params }) {
  const gallery = getGallery(params.slug);
  if (!gallery) throw error(404, `No gallery found for "${params.slug}"`);
  return { gallery };
}

// So the route prerenders cleanly if the site is ever built statically.
export function entries() {
  return getGallerySlugs().map((slug) => ({ slug }));
}
