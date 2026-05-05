<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import ImageGallery from '../../../lib/components/ImageGallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import masterImageData from '../../../lib/assets/media_manager/images/image-data.json';

  let pageName = "Central Bay";
  let quote = "The fog comes in on little cat's feet. It sits looking over harbor and city on silent haunches and then moves on.";
  let quote_author = "Carl Sandburg";
  let galleryLocation = "galleries/bay";
  
  // Define the order of locations to display
  const locationOrder = ["Santa Cruz", "Monterey", "Morro Bay"];
  
  // Location subtitles
  const locationSubtitles = {
    "Santa Cruz": "Santa Cruz County, California",
    "Monterey": "Monterey County, California",
    "Morro Bay": "San Luis Obispo County, California"
  };
  
  // Grouped images by location
  let imagesByLocation = {};
  let bestImages = [];

  // Find banner image from metadata
  const bannerImage = masterImageData.images.find(img => 
    img.site_location === galleryLocation && 
    img.banner_image === true && 
    img.active === true
  );

  if (!bannerImage) {
    console.warn(`Gallery "${pageName}" failed to load - missing banner image.`);
  }

  const headerUrl = bannerImage ? new URL(`../../../lib/assets/media_manager/images/files/${bannerImage.file_name}`, import.meta.url).href : '';
  
  onMount(() => {
    // Load best images from this gallery
    const bestImagesData = masterImageData.images.filter(img => 
      img.site_location === galleryLocation && 
      img.active === true &&
      img.location_best === true
    );
    
    bestImages = bestImagesData.map(imageData => {
      const imageUrl = new URL(`../../../lib/assets/media_manager/images/files/${imageData.file_name}`, import.meta.url).href;
      return {
        src: imageUrl,
        title: imageData.image_name || "",
        location: imageData.location || "",
        link: ""
      };
    });
    
    // Filter and group active central bay images by location
    const bayImages = masterImageData.images.filter(img => 
      img.site_location === galleryLocation && 
      img.active === true &&
      img.location && 
      img.location.trim() !== ''
    );
    
    // Group images by location
    bayImages.forEach(imageData => {
      const location = imageData.location;
      if (!imagesByLocation[location]) {
        imagesByLocation[location] = [];
      }
      
      const imageUrl = new URL(`../../../lib/assets/media_manager/images/files/${imageData.file_name}`, import.meta.url).href;
      imagesByLocation[location].push({
        src: imageUrl,
        title: imageData.image_name || "",
        location: imageData.location || "",
        link: ""
      });
    });
    
    // Trigger reactivity
    imagesByLocation = imagesByLocation;
  });
</script>

<Header />
<Banner {pageName} {headerUrl} />

<section class="description">
  <div>
    <p>{quote}</p>
    <h1>{quote_author}</h1>
  </div>
</section>

{#if bestImages.length > 0}
  <section class="best-images-section">
    <ImageGallery images={bestImages} />
    <p class="best-images-subtitle">Highlights</p>
    <hr class="section-divider" />
  </section>
{/if}

{#each locationOrder as location}
  {#if imagesByLocation[location] && imagesByLocation[location].length > 0}
    <section class="location-section">
      <h2 class="location-subtitle">{location}</h2>
      <p class="location-subsubtitle">{locationSubtitles[location]}</p>
      <ImageGallery images={imagesByLocation[location]} />
    </section>
  {/if}
{/each}

<div class="navigation-buttons">
  <a href="/galleries/neotropical"><button>Previous</button></a>
  <a href="/galleries"><button>Galleries</button></a>
  <a href="/galleries/low-tide"><button>Next</button></a>
</div>

<Footer />

<style>
  @import '../../../lib/assets/styles/styles.css';
</style>
