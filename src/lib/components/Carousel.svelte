<script>
  let { images = [] } = $props();
  let carouselRef = $state(null);

  let selectedImage = $state(null);
  let selectedIndex = $state(-1);

  function scrollNext() {
    if (carouselRef) {
      carouselRef.scrollBy({ left: carouselRef.clientWidth, behavior: 'smooth' });
    }
  }

  function scrollPrev() {
    if (carouselRef) {
      carouselRef.scrollBy({ left: -carouselRef.clientWidth, behavior: 'smooth' });
    }
  }

  function openLightbox(image) {
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
</script>

<svelte:window onkeydown={handleKeydown} />

{#if images.length > 0}
  <div class="carousel-container">
    {#if images.length > 1}
      <button class="nav-button prev" onclick={scrollPrev} aria-label="Previous image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
    {/if}

    <div class="carousel-track" bind:this={carouselRef}>
      {#each images as image}
        <div 
          class="carousel-slide"
          style="flex: 0 0 {image.width && image.height ? 300 * (image.width / image.height) : 400}px;"
        >
          {#if image.src}
            <button class="image-button" onclick={() => openLightbox(image)}>
              <img src={image.src} alt={image.title} />
            </button>
          {/if}
          {#if image.caption || image.title}
            <div class="caption">
              {image.caption || image.title}
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if images.length > 1}
      <button class="nav-button next" onclick={scrollNext} aria-label="Next image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    {/if}
  </div>
{/if}

{#if selectedImage}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onclick={closeLightbox}
  >
    <div class="lightbox-navigation">
      {#if images.length > 1}
        <button
          class="lightbox-nav-button prev"
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
      {/if}

      <img
        src={selectedImage.src}
        alt={selectedImage.title || 'Gallery'}
        onclick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        oncontextmenu={(e) => e.preventDefault()}
        style="cursor: pointer;"
        title="Click for next image"
      />

      {#if images.length > 1}
        <button
          class="lightbox-nav-button next"
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
      {/if}
    </div>

    <button class="close-button" onclick={closeLightbox} aria-label="Close lightbox">✕</button>

    <div class="lightbox-caption-container">
      {#if selectedImage.title}
        <div class="image-title">{selectedImage.title}</div>
      {/if}
      {#if selectedImage.caption}
        <div class="image-caption">{selectedImage.caption}</div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 15px auto;
    display: flex;
    align-items: center;
  }

  .carousel-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    gap: 20px;
    padding: 0 10%;
    padding-bottom: 10px;
  }
  
  .carousel-track::-webkit-scrollbar {
    display: none;
  }
  .carousel-track {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .carousel-slide {
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .image-button:hover {
    transform: scale(1.02);
  }

  .carousel-slide img {
    width: 100%;
    height: 300px;
    object-fit: contain;
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  .caption {
    margin-top: 10px;
    font-size: 0.9em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #888;
    text-align: center;
    max-width: 700px;
    line-height: 1.5;
    padding: 0 10px;
  }

  .nav-button {
    position: absolute;
    top: calc(50% - 20px);
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 10;
    transition: all 0.2s ease;
    color: #444;
  }

  .nav-button svg {
    width: 18px;
    height: 18px;
  }

  .nav-button:hover {
    background: #fff;
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }

  @media (max-width: 768px) {
    .nav-button {
      display: none;
    }
    .carousel-track {
      gap: 15px;
    }
  }

  /* Lightbox Styles */
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 10, 0.95);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  }

  .lightbox-navigation {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 85vh;
  }

  .lightbox-navigation img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    user-select: none;
  }

  .lightbox-nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .lightbox-nav-button:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .lightbox-nav-button.prev {
    left: 20px;
  }

  .lightbox-nav-button.next {
    right: 20px;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
    z-index: 10000;
  }

  .close-button:hover {
    opacity: 1;
  }

  .lightbox-caption-container {
    color: white;
    text-align: center;
    padding: 15px 20px;
    max-width: 800px;
  }

  .image-title {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }
  
  .image-caption {
    font-size: 1rem;
    color: #ccc;
    line-height: 1.5;
  }
</style>
