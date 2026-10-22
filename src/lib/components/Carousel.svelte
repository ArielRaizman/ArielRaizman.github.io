<script>
  let { images = [] } = $props();
  let carouselRef = $state(null);
  import Lightbox from "./Lightbox.svelte";

  let showLightbox = $state(false);
  let lightboxInitialIndex = $state(0);

  function openLightbox(image) {
    lightboxInitialIndex = images.findIndex((img) => img.src === image.src);
    showLightbox = true;
  }

  let currentImageIndex = $state(0);

  function updateActiveDot() {
    if (!carouselRef) return;
    const scrollLeft = carouselRef.scrollLeft;
    const centerPosition = scrollLeft + carouselRef.clientWidth / 2;

    const slides = carouselRef.querySelectorAll(".carousel-slide");
    
    // Check if scrolled to the very end
    if (Math.ceil(scrollLeft + carouselRef.clientWidth) >= carouselRef.scrollWidth - 1) {
      currentImageIndex = slides.length - 1;
      return;
    }

    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const relativeCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(
        relativeCenter - centerPosition,
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    currentImageIndex = closestIndex;
  }

  $effect(() => {
    if (!carouselRef || images.length === 0) return;

    carouselRef.addEventListener("scroll", updateActiveDot);
    setTimeout(updateActiveDot, 100);

    return () => {
      if (carouselRef) {
        carouselRef.removeEventListener("scroll", updateActiveDot);
      }
    };
  });

  function scrollToSlide(index) {
    if (carouselRef) {
      const slides = carouselRef.querySelectorAll(".carousel-slide");
      if (slides[index]) {
        slides[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }
  function scrollPrev() {
    if (currentImageIndex > 0) {
      scrollToSlide(currentImageIndex - 1);
    }
  }

  function scrollNext() {
    if (currentImageIndex < images.length - 1) {
      scrollToSlide(currentImageIndex + 1);
    }
  }
</script>

{#if images.length > 0}
  <div class="carousel-wrapper">
    <div class="carousel-container">
      {#if images.length > 1}
        <button
          class="nav-button prev"
          onclick={scrollPrev}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      {/if}

      <div class="carousel-track" bind:this={carouselRef}>
        {#each images as image}
          <div
            class="carousel-slide"
            style="flex: 0 0 {image.width && image.height
              ? 300 * (image.width / image.height)
              : 400}px;"
          >
            {#if image.src}
              <button class="image-button" onclick={() => openLightbox(image)}>
                <img src={image.previewSrc || image.src} alt={image.title} />
              </button>
            {/if}
            {#if image.caption || image.title}
              <div class="caption">
                {@html image.caption || image.title}
              </div>
            {/if}
          </div>
        {/each}
      </div>

      {#if images.length > 1}
        <button
          class="nav-button next"
          onclick={scrollNext}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      {/if}
    </div>

    {#if images.length > 1}
      <div class="carousel-dots">
        {#each images as _, i}
          <button
            class="dot {currentImageIndex === i ? 'active' : ''}"
            aria-label="Go to slide {i + 1}"
            onclick={() => scrollToSlide(i)}
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

{#if showLightbox}
  <Lightbox {images} initialIndex={lightboxInitialIndex} onClose={() => showLightbox = false} />
{/if}

<style>
  .carousel-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 15px auto;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    display: flex;
    align-items: center;
  }

  .carousel-dots {
    display: flex;
    gap: 8px;
    margin-top: 15px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100%;
    padding: 0 10px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background-color: #ccc;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot.active {
    background-color: #555;
    transform: scale(1.2);
  }

  .dot:hover {
    background-color: #888;
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
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .caption {
    margin-top: 10px;
    font-size: 0.9em;
    font-family: "Georgia", serif;
    color: #555;
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

</style>
