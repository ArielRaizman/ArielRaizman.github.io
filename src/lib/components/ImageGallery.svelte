<script>
  import { Masonry } from '@nicbat/svelte-masonry';

  import Lightbox from './Lightbox.svelte';

  let { images = [], minColumnWidth = 400, gap = 16 } = $props();

  let showLightbox = $state(false);
  let lightboxInitialIndex = $state(0);
  let loaded = $state(new Set());

  function markLoaded(src) {
    loaded.add(src);
    loaded = new Set(loaded); // trigger reactivity
  }

  function selectImage(image) {
    lightboxInitialIndex = images.findIndex((img) => img.src === image.src);
    showLightbox = true;
  }

  const aspectOf = (item) =>
    item.width && item.height ? item.width / item.height : 1;
</script>

<section class="gallery">
  <Masonry
    items={images}
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
          src={item.src}
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

{#if showLightbox}
  <Lightbox {images} initialIndex={lightboxInitialIndex} onClose={() => showLightbox = false} />
{/if}

<style>
  .gallery {
    padding: 20px;
  }

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

</style>
