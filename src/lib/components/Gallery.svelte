<script>
  import { onMount, onDestroy } from 'svelte';
  import Masonry from 'svelte-bricks';
  import { page } from '$app/stores';

  export let images = [];
  export let quote = "quote";
  export let quote_author = "quote_author";
  
  let selectedImage = null;
  let selectedImageIndex = -1;
  let nColumns = 5; 
  let gap = 20; 
  let minColWidth = 400; 
  let maxColWidth = 1600; 
  
  let galleries = ["galleries/low-tide", "galleries/the-great-bear-valley", "galleries/the-central-valley", "galleries/cascadia"];
  let currentGallery = $page.url.pathname.split('/').pop();
  let currentGalleryIndex = galleries.findIndex(gallery => gallery.includes(currentGallery));
  let prevGallery = galleries[(currentGalleryIndex - 1 + galleries.length) % galleries.length];
  let nextGallery = galleries[(currentGalleryIndex + 1) % galleries.length];

  let lightboxImage;
  let imageTitle;

  function navigateTo(destination) {
    goto(destination);
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
      window.addEventListener('keydown', handleKeydown);
    }
  });

  // $: if (selectedImage && lightboxImage && imageTitle) {
  //   imageTitle.style.width = `${lightboxImage.clientWidth}px`;
  // }
</script>
  
<section class="description">
  <div>
    <p>{quote}</p>
    <h1>{quote_author}</h1>
  </div>
</section>
  
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
      <img src={item.src} alt="Gallery" on:contextmenu={e => e.preventDefault()} />
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
        <span on:click={() => window.location.href = `/blog/${selectedImage.link}`}>{selectedImage.location}</span> - {selectedImage.title}
      </div>
    {:else if selectedImage.title}
      <div class="image-title no-underline" bind:this={imageTitle}>{selectedImage.title}</div>
    {/if}
  </div>
{/if}

<div class="navigation-buttons">
  <a href="/{prevGallery}"><button>Previous</button></a>
  <a href="/galleries"><button>Galleries</button></a>
  <a href="/{nextGallery}"><button>Next</button></a>
</div>

<style>
  @import '../assets/styles/styles.css';
  .description {
    padding: 50px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    color: black;
  }
  
  .description div {
    display: inline-flex;
    flex-direction: column; 
    align-items: flex-end; 
  }
  
  .description p {
    font-size: 1.5rem;
    font-family: 'Georgia', serif;
    font-style: italic;
    margin: 0; 
    padding: 0; 
    line-height: 1.2; 
  }
  
  .description h1 {
    font-size: 1rem;
    font-family: 'Georgia', serif;
    font-style: oblique;
    margin: 0; 
    padding-top: 10px; 
    align-self: flex-end; 
  }
  .gallery {
    padding: 20px;
  }
  
  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    .image-title {
    position: absolute; 
    bottom: 0;
    left: 0;
    width: 100%;
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    text-align : center;
    font-size: 1.2rem;
    letter-spacing: 0.7px;
    font-weight: 100;
    }
    /* .no-underline {
      text-decoration: none !important;
      cursor: pointer !important;
      transition: opacity 0.3s ease;
    } */

    .no-underline:hover {
      text-decoration: none !important;
      cursor: default !important;
      transition: opacity 0.3s ease;
      opacity: 1;
    }
  
  .gallery-item {
    transition: transform 0.3s ease;
    cursor: pointer;
    width: 100%;
    overflow: hidden;
  }

  /* .gallery-item img {
    display: block;
    width: 100%;
    height: auto;
  } */
  
  .gallery-item:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
  
  .lightbox img:hover + .image-title {
    opacity: 1;
  }
  /* .image-title:hover {
    opacity: 1;
  } */
  
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

  /* Make buttons more touch-friendly on mobile */
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

  .navigation-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .navigation-buttons button {
    flex: 1;
    text-align: center;
    max-width: 200px;
  }

  .navigation-buttons button {
    padding: 10px 20px;
    padding-bottom: 12px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    background-color: #333;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    min-width: 200px;
  }

  .navigation-buttons button:hover {
    background-color: #555;
  }

  @media (max-width: 600px) {
    .navigation-buttons {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .navigation-buttons button {
      max-width: 30px;
      width: 50%;
      max-width: none;
    }
  }
</style>