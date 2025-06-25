<script>
  export let image;
  export let onSelect = () => {};
  
  let loaded = false;
  
  function handleLoad() {
    loaded = true;
  }
</script>

<div class="gallery-item" on:click={() => onSelect(image)}>
  <img 
    src={image.src} 
    alt={image.title || "Gallery"} 
    class:loaded
    on:load={handleLoad}
    on:contextmenu={e => e.preventDefault()} 
  />
</div>

<style>
  .gallery-item {
    transition: transform 0.3s ease;
    cursor: pointer;
    width: 100%;
    overflow: hidden;
  }

  .gallery-item:hover {
    transform: scale(1.02);
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
</style> 