<script>
  import { onMount } from 'svelte';
  import Masonry from 'svelte-bricks';
  import { page } from '$app/stores';

  export let images = [];

  export let quote = "quote";
  export let quote_author = "quote_author";
  
  let selectedImage = null;
  let nColumns = 5; 
  let gap = 20; 
  let minColWidth = 400; 
  let maxColWidth = 1600; 
  
  let width = 0; 
  let galleries = ["galleries/low-tide", "galleries/the-great-bear-valley", "galleries/the-central-valley", "galleries/cascadia"];
  let currentGallery = $page.url.pathname.split('/').pop();
  let currentGalleryIndex = galleries.findIndex(gallery => gallery.includes(currentGallery));
  // console.log(currentGalleryIndex);
  let prevGallery = galleries[(currentGalleryIndex - 1 + galleries.length) % galleries.length];
  let nextGallery = galleries[(currentGalleryIndex + 1) % galleries.length];
  // let prevGallery = galleries[(currentGalleryIndex + 2  ) % galleries.length];
  

  let lightboxImage;
  let imageTitle;

  function navigateTo(destination) {
    goto(destination);
  }

  $: if (selectedImage && lightboxImage && imageTitle) {
    imageTitle.style.width = `${lightboxImage.clientWidth}px`;
  }
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
    <div class="gallery-item" on:click={() => (selectedImage = item)}>
    <img src={item.src} alt="Gallery" on:contextmenu={e => e.preventDefault()} />
    <!-- <p>{item.title}</p> -->
  </div>
  </Masonry>
</section>
  
{#if selectedImage}
  <div class="lightbox" on:click={() => (selectedImage = null)}>
    <!-- <div class="lightbox-content"> -->
      <img src={selectedImage.src} on:contextmenu={e => e.preventDefault()} bind:this={lightboxImage}/>
      {#if selectedImage.location}
        <div class="image-title" bind:this={imageTitle}>
          <span on:click={() => window.location.href = `/blog/${selectedImage.link}`}>{selectedImage.location}</span> - {selectedImage.title}
        </div>
    {:else if selectedImage.title}
      <div class="image-title no-underline" bind:this={imageTitle}>{selectedImage.title}</div>
    <!-- {:else}
      <div class="image-title" bind:this={imageTitle}>{selectedImage.title}</div> -->
    <!-- </div> -->
    {/if}
</div>
{/if}

<div></div>
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
    /* width: 100%; */
    background: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: left;
    padding: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    }

    .image-title:hover {
    text-decoration: underline;
    cursor: pointer;
    transition: opacity 0.3s ease;
    opacity: 1;
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
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  /* .lightbox-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  } */
  
  .lightbox img {
    /* width: auto;
    height: auto; */
    max-width: 90%;
    max-height: 90%;
  }

  .lightbox .image-title {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    /* transform: translateY(-10%); */
    background: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: left;
    padding: 10px;
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