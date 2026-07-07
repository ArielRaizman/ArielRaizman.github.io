<script>
  import { Masonry } from '@nicbat/svelte-masonry';

  let { images = [], minColumnWidth = 400, gap = 16 } = $props();

  let selectedImage = $state(null);
  let selectedIndex = $state(-1);
  let loaded = $state(new Set());

  function markLoaded(src) {
    loaded.add(src);
    loaded = new Set(loaded); // trigger reactivity
  }

  function selectImage(image) {
    selectedImage = image;
    selectedIndex = images.findIndex((img) => img.src === image.src);
  }

  function prevImage() {
    if (!images.length) return;
    selectedIndex = (selectedIndex - 1 + images.length) % images.length;
    selectedImage = images[selectedIndex];
  }

  function nextImage() {
    if (!images.length) return;
    selectedIndex = (selectedIndex + 1) % images.length;
    selectedImage = images[selectedIndex];
  }

  function closeLightbox() {
    selectedImage = null;
  }

  function handleKeydown(e) {
    if (!selectedImage) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prevImage();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextImage();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      closeLightbox();
      e.preventDefault();
    }
  }

  const aspectOf = (item) =>
    item.width && item.height ? item.width / item.height : 1;
</script>

<svelte:window onkeydown={handleKeydown} />

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

{#if selectedImage}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onclick={closeLightbox}
  >
    <div class="lightbox-navigation">
      <button
        class="nav-button prev"
        onclick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <img
        src={selectedImage.src}
        alt={selectedImage.title || 'Gallery'}
        onclick={(e) => e.stopPropagation()}
        oncontextmenu={(e) => e.preventDefault()}
      />

      <button
        class="nav-button next"
        onclick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <button class="close-button" onclick={closeLightbox} aria-label="Close lightbox">✕</button>

    {#if selectedImage.location}
      <div class="image-title">{selectedImage.title}</div>
    {:else if selectedImage.title}
      <div class="image-title no-underline">{selectedImage.title}</div>
    {/if}
  </div>
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
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .gallery-item img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .gallery-item img.loaded {
    opacity: 1;
  }

  .gallery-item:hover {
    transform: scale(1.02);
  }

  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border: none;
  }

  .lightbox-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .nav-button {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 1010;
  }

  .nav-button:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  .nav-button.prev {
    left: 20px;
  }

  .nav-button.next {
    right: 20px;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1010;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  .lightbox img {
    max-width: 90%;
    max-height: 85%;
    object-fit: contain;
  }

  .image-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.2rem;
    letter-spacing: 0.7px;
    font-weight: 100;
    font-family: 'georgia', serif;
  }

  .no-underline:hover {
    text-decoration: none !important;
    cursor: default !important;
    opacity: 1;
  }

  @media (max-width: 768px) {
    .nav-button {
      width: 40px;
      height: 40px;
    }

    .nav-button.prev {
      left: 10px;
    }

    .nav-button.next {
      right: 10px;
    }
  }
</style>
