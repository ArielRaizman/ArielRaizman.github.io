<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import masterImageData from './../assets/image-data.json';
  import ImageGallery from './ImageGallery.svelte';

  export let location = "";
  export let quote = "quote";
  export let quote_author = "quote_author";
  
  let images = [];
  let galleries = ["galleries/low-tide", "galleries/the-great-bear-valley", "galleries/the-central-valley", "galleries/cascadia"];
  let currentGallery = $page.url.pathname.split('/').pop();
  let currentGalleryIndex = galleries.findIndex(gallery => gallery.includes(currentGallery));
  let prevGallery = galleries[(currentGalleryIndex - 1 + galleries.length) % galleries.length];
  let nextGallery = galleries[(currentGalleryIndex + 1) % galleries.length];
  
  // Load images based on location
  onMount(async () => {
    if (typeof window === 'undefined') return;
    
    try {
      // Filter master JSON to get images for this location, handling full path
      const fullPath = location.startsWith('galleries/') ? location : `galleries/${location}`;
      const relevantImages = masterImageData.filter(img => 
        img.location === fullPath && 
        img.active === true 
        // && img.link 
      );
      
      // Load each image dynamically
      for (const imageData of relevantImages) {
        try {
          // Use @/ alias for imports in Vite/SvelteKit
          const imageUrl = new URL(`../assets/${imageData.image_name}`, import.meta.url).href;
          
          // Add to our images array
          images = [...images, { 
            src: imageUrl, 
            title: imageData.title || "",
            location: imageData.image_location || "",
            link: imageData.link || ""
          }];
        } catch (err) {
          console.error(`Failed to load image: ${imageData.image_name} in location ${fullPath}`, err);
        }
      }
    } catch (err) {
      console.error("Error loading images:", err);
    }
  });
</script>

<section class="description">
  <div>
    <p>{quote}</p>
    <h1>{quote_author}</h1>
  </div>
</section>

<ImageGallery {images} />

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

  .navigation-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
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