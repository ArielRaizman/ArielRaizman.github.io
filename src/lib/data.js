// Build-time data access for the media-manager workspace.
//
// The site's photos + galleries live in `src/lib/assets/media_manager/` (edited
// with `npx media-manager`) and are read here through the reader package — the
// same pattern nicb.at uses. `import.meta.glob` bundles the workspace at build
// time: one glob for the JSON. Blobs are NOT globbed — the workspace is in
// static-assets mode (config `assets: { dir: './static/media', baseUrl: '/media' }`),
// so the reader synthesizes each blob's URL from the manifest as
// `/media/<file_name>` and the binaries are served straight from `static/media/`
// instead of being bundled. The `!**/google.json` exclusion keeps the Google Photos
// OAuth secret out of the client bundle. The reader joins it all once; we query it below.
import { MediaManager } from 'media-manager/reader/vite';

const mm = MediaManager.load(
  {
    data: import.meta.glob(['$lib/assets/media_manager/**/*.json', '!**/google.json'], {
      eager: true,
      import: 'default'
    })
  },
  {
    // Static-assets mode: blobs served from /media/<file>, not bundled (see static/media/).
    assets: { baseUrl: '/media' }
  }
);

// Read photos through the `photos` CLASS view: that's where the per-photo
// metadata (title/active/best/link/gallery) lives. Following a
// gallery record's `photos` file-field instead would give blob-level items with
// empty `fields`, so we match on each photo's `gallery` record-reference field.
const photos = () => mm.media('photos');

// Photos belonging to one gallery (by the gallery record's id), in workspace
// order — matches the legacy per-location ordering.
const membersOf = (galleryId) => photos().filter((p) => p.field('gallery') === galleryId);

// A gallery's cover image: its `cover_photo` file field (a single blob reference),
// mirroring nicb.at. Empty/unset → null (that gallery is then off the index).
const coverSrcOf = (gallery) => gallery.file('cover_photo')?.src ?? null;

// Shape every gallery/grid photo the way ImageGallery expects:
// { src, width, height, title, location, link }. `width`/`height` let the
// masonry balance columns by aspect ratio; `location` is the caption-location.
const toImage = (p) => ({
  src: p.src,
  width: p.width,
  height: p.height,
  title: p.field('title') ?? '',
  location: p.field('image_location') ?? '',
  link: p.field('link') ?? ''
});

// Site-wide singleton images, stored on the globals record as file fields:
// the home hero (desktop/mobile), the shared page-header banner, and the
// about-page profile photo. Any unset field resolves to '' so callers can use
// it directly as a background/src.
export function getSiteAssets() {
  const g = mm.globals();
  return {
    heroDesktop: g?.file('hero_desktop')?.src ?? '',
    heroMobile: g?.file('hero_mobile')?.src ?? '',
    pageHeader: g?.file('page_header')?.src ?? '',
    profile: g?.file('profile_photo')?.src ?? ''
  };
}

// Resolve a single workspace blob's URL by its filename — used by the blog
// posts to pull specific images out of the media library instead of importing
// loose files. Returns '' if no blob matches.
export function getPhotoSrc(filename) {
  return mm.media().find((m) => m.filename === filename)?.src ?? '';
}

// Home "best" grid: active photos flagged `best`.
export function getBestPhotos() {
  return photos()
    .where({ best: true, active: true })
    .map(toImage)
    .filter((img) => img.src);
}

// Galleries index tiles. Mirrors the old behaviour: only galleries with a
// resolvable active banner are shown (e.g. American Southwest has none, so it
// stays reachable by URL but off the index).
export function getGalleryTiles() {
  return mm
    .records('galleries')
    .map((g) => ({
      name: g.field('name') ?? '',
      slug: g.field('html_route') ?? '',
      src: coverSrcOf(g)
    }))
    .filter((tile) => tile.src && tile.slug);
}

// All gallery slugs, in workspace order (used for [slug] prerender entries + nav).
export function getGallerySlugs() {
  return mm
    .records('galleries')
    .map((g) => g.field('html_route'))
    .filter(Boolean);
}

// One gallery by its html_route slug, with its active photos and prev/next
// neighbours (wrapping) for the gallery-to-gallery nav buttons.
export function getGallery(slug) {
  const g = mm.records('galleries').find((rec) => rec.field('html_route') === slug);
  if (!g) return null;

  const photoList = membersOf(g.id)
    .where({ active: true })
    .map(toImage)
    .filter((img) => img.src);

  const slugs = getGallerySlugs();
  const i = slugs.indexOf(slug);
  const prev = slugs[(i - 1 + slugs.length) % slugs.length];
  const next = slugs[(i + 1) % slugs.length];

  return {
    name: g.field('name') ?? '',
    slug,
    quote: g.field('quote') ?? '',
    quote_author: g.field('quote_author') ?? '',
    description: g.field('description') ?? '',
    banner: coverSrcOf(g) ?? '',
    photos: photoList,
    prev,
    next
  };
}
