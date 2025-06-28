<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import masterImageData from '../../../lib/assets/image-data.json';

  let pageName = "Central Bay";
  let quote = "The fog comes in on little cat's feet. It sits looking over harbor and city on silent haunches and then moves on.";
  let quote_author = "Carl Sandburg";
  let galleryLocation = "galleries/bay";

  // Find banner image from metadata
  const bannerImage = masterImageData.find(img => 
    img.location === galleryLocation && 
    img.banner_image === true && 
    img.active === true
  );

  if (!bannerImage) {
    console.warn(`Gallery "${pageName}" failed to load - missing banner image.`);
  }

  const headerUrl = bannerImage ? new URL(`../../../lib/assets/${bannerImage.image_name}`, import.meta.url).href : '';
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />
