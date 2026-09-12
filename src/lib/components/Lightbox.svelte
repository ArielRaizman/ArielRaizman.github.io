<script>
  let { 
    images = [], 
    initialIndex = 0, 
    onClose 
  } = $props();

  let selectedIndex = $state(initialIndex);
  let selectedImage = $derived(images[selectedIndex]);

  function prevImage() {
    if (!images.length) return;
    selectedIndex = (selectedIndex - 1 + images.length) % images.length;
  }

  function nextImage() {
    if (!images.length) return;
    selectedIndex = (selectedIndex + 1) % images.length;
  }

  function handleKeydown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prevImage();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextImage();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      onClose();
      e.preventDefault();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="lightbox"
  role="dialog"
  aria-modal="true"
  tabindex="-1"
  onclick={onClose}
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
        if (images.length > 1) nextImage();
      }}
      oncontextmenu={(e) => e.preventDefault()}
      style={images.length > 1 ? "cursor: pointer;" : ""}
      title={images.length > 1 ? "Click for next image" : ""}
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

  <button class="close-button" onclick={onClose} aria-label="Close lightbox">✕</button>

  <div class="lightbox-caption-container">
    {#if selectedImage.title}
      <div class="image-title">{@html selectedImage.title}</div>
    {/if}
    {#if selectedImage.caption}
      <div class="image-caption">{@html selectedImage.caption}</div>
    {/if}
  </div>
</div>

<style>
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
    z-index: 10000;
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
    font-family: "Georgia", serif;
    color: #ccc;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .lightbox-nav-button {
      width: 40px;
      height: 40px;
    }

    .lightbox-nav-button.prev {
      left: 10px;
    }

    .lightbox-nav-button.next {
      right: 10px;
    }
  }
</style>
