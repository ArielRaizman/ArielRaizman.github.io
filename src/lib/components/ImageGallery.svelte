<script>
  import { onMount, onDestroy } from 'svelte';
  import Masonry from 'svelte-bricks';

  export let images = [];
  export let minColWidth = 400;
  export let maxColWidth = 1600;
  export let gap = 20;

  let selectedImage = null;
  let selectedImageIndex = -1;
  let lightboxImage;
  let imageTitle;
  let loadedImages = new Set();

  function handleImageLoad(src) {
    loadedImages.add(src);
    loadedImages = loadedImages; // Trigger reactivity
  }

  // Set the selected image and update the index
  function selectImage(image) {
    selectedImage = image;
    selectedImageIndex = images.findIndex(img => img.src === image.src);
  }

  // Navigate to previous image
  function prevImage() {
    if (!images || images.length === 0) return;
    selectedImageIndex = (selectedImageIndex - 1 + images.length) % images.length;
    selectedImage = images[selectedImageIndex];
  }

  // Navigate to next image
  function nextImage() {
    if (!images || images.length === 0) return;
    selectedImageIndex = (selectedImageIndex + 1) % images.length;
    selectedImage = images[selectedImageIndex];
  }

  // Handle keyboard navigation
  function handleKeydown(e) {
    if (!selectedImage) return;
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prevImage();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextImage();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      selectedImage = null;
      e.preventDefault();
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

<section class="gallery">
  <Masonry
    items={images}
    idKey="src"
    let:item
    {minColWidth}
    {maxColWidth}
    {gap}
    animate={true}
    duration={300}
  >
    <div class="gallery-item" on:click={() => selectImage(item)}>
      <div class="image-container">
        <img 
          src={item.src} 
          alt={item.title || "Gallery"} 
          class:loaded={loadedImages.has(item.src)}
          on:load={() => handleImageLoad(item.src)}
          on:contextmenu={e => e.preventDefault()} 
        />
        {#if !loadedImages.has(item.src)}
          <div class="loading-placeholder"></div>
        {/if}
      </div>
    </div>
  </Masonry>
</section>

{#if selectedImage}
  <div class="lightbox" on:click={() => (selectedImage = null)}>
    <div class="lightbox-navigation">
      <button class="nav-button prev" on:click={prevImage} on:click={e => e.stopPropagation()} aria-label="Previous image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <img src={selectedImage.src} on:contextmenu={e => e.preventDefault()} on:click={e => e.stopPropagation()} bind:this={lightboxImage}/>
      
      <button class="nav-button next" on:click={nextImage} on:click={e => e.stopPropagation()} aria-label="Next image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <button class="close-button" on:click={() => (selectedImage = null)} aria-label="Close lightbox">✕</button>
    
    {#if selectedImage.location}
      <div class="image-title" bind:this={imageTitle}>
        <!-- <span class="link" on:click={() => window.location.href = `/blog/${selectedImage.link}`}>{selectedImage.location}</span> - {selectedImage.title} -->
         {selectedImage.title}
      </div>
    {:else if selectedImage.title}
      <div class="image-title no-underline" bind:this={imageTitle}>{selectedImage.title}</div>
    {/if}
  </div>
{/if}

<style>
  .gallery {
    padding: 20px;
  }

  .gallery-item {
    transition: transform 0.3s ease;
    cursor: pointer;
    width: 100%;
    overflow: hidden;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .gallery-item img.loaded {
    opacity: 1;
  }

  .loading-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
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

  .link {
    text-decoration: underline;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .link:hover {
    opacity: 0.8;
  }

  .no-underline:hover {
    text-decoration: none !important;
    cursor: default !important;
    transition: opacity 0.3s ease;
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