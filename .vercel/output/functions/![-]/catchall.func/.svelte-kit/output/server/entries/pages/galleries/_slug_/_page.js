import { error } from "@sveltejs/kit";
import { d as getGallerySlugs, e as getGallery } from "../../../../chunks/data.js";
function load({ params }) {
  const gallery = getGallery(params.slug);
  if (!gallery) throw error(404, `No gallery found for "${params.slug}"`);
  return { gallery };
}
function entries() {
  return getGallerySlugs().map((slug) => ({ slug }));
}
export {
  entries,
  load
};
