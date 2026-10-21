<script>
  import { Masonry } from '@nicbat/svelte-masonry';

  import Lightbox from './Lightbox.svelte';
  import SubcategoryDivider from './SubcategoryDivider.svelte';

  let { images = null, sections = null, minColumnWidth = 400, gap = 16 } = $props();

  // Normalise: flat `images` (backward compat) wraps into a single anonymous
  // section; `sections` is used as-is when provided.
  let displaySections = $derived(
    sections ?? [{ name: null, description: null, photos: images ?? [] }]
  );

  // Flat image list for lightbox — preserves visual (section) order.
  let allImages = $derived(displaySections.flatMap(s => s.photos));

  // Named sections drive the jump-nav at the top.
  let namedSections = $derived(displaySections.filter(s => s.name));

  let showLightbox = $state(false);
  let lightboxInitialIndex = $state(0);
  let loaded = $state(new Set());

  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  function scrollToSection(name) {
    const el = document.getElementById(`subcategory-${slugify(name)}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function markLoaded(src) {
    loaded.add(src);
    loaded = new Set(loaded); // trigger reactivity
  }

  function selectImage(image) {
    lightboxInitialIndex = allImages.findIndex((img) => img.src === image.src);
    showLightbox = true;
  }

  const aspectOf = (item) =>
    item.width && item.height ? item.width / item.height : 1;
</script>

<div class="gallery-wrapper">
  {#if namedSections.length > 0}
    <nav class="subcategory-nav" aria-label="Subcategory navigation">
      {#each namedSections as section, i}
        {#if i > 0}<span class="nav-pipe" aria-hidden="true">|</span>{/if}
        <button class="nav-link" onclick={() => scrollToSection(section.name)}>
          {section.name}
        </button>
      {/each}
    </nav>
  {/if}

  {#each displaySections as section}
    <div
      id={section.name ? `subcategory-${slugify(section.name)}` : null}
      class:section-anchor={!!section.name}
    >
      {#if section.name}
        <SubcategoryDivider name={section.name} description={section.description} />
      {/if}

      <section class="gallery-section">
        <Masonry
          items={section.photos}
          getKey={(item) => item.src}
          aspectRatio={aspectOf}
          {minColumnWidth}
          {gap}
          footerEstimate={0}
          animate
        >
          {#snippet children(item)}
            <button
              class="gallery-item"
              onclick={() => selectImage(item)}
              aria-label={item.title || 'Open image'}
            >
              <img
                src={item.previewSrc || item.src}
                alt={item.title || 'Gallery'}
                loading="lazy"
                class:loaded={loaded.has(item.src)}
                onload={() => markLoaded(item.src)}
                oncontextmenu={(e) => e.preventDefault()}
              />
            </button>
          {/snippet}
        </Masonry>
      </section>
    </div>
  {/each}
</div>

{#if showLightbox}
  <Lightbox images={allImages} initialIndex={lightboxInitialIndex} onClose={() => showLightbox = false} />
{/if}

<style>
  .gallery-wrapper {
    padding: 20px;
  }

  /* ── Subcategory jump-nav ── */

  .subcategory-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 0;
    padding: 0px 0 20px;
  }

  .nav-link {
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Georgia', serif;
    font-size: 0.85rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #999;
    padding: 4px 10px;
    transition: color 0.25s ease;
  }

  .nav-link:hover {
    color: #555;
  }

  .nav-pipe {
    font-family: 'Georgia', serif;
    font-size: 0.72rem;
    color: rgba(0, 0, 0, 0.15);
    user-select: none;
    line-height: 1;
  }

  /* ── Scroll anchor offset for fixed header ── */

  .section-anchor {
    scroll-margin-top: 100px;
  }

  /* ── Gallery items ── */

  .gallery-item {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .gallery-item img {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .gallery-item img.loaded {
    opacity: 1;
  }

  .gallery-item:hover {
    transform: scale(1.02);
  }

  @media (max-width: 600px) {
    .nav-link {
      font-size: 0.65rem;
      letter-spacing: 0.14em;
      padding: 4px 8px;
    }

    .nav-pipe {
      font-size: 0.65rem;
    }
  }
</style>
