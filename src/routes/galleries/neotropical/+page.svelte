<script>
  import { onMount } from 'svelte';
  import Masonry from 'svelte-bricks';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import masterImageData from '../../../lib/assets/image-data.json';

  let pageName = "Neotropical";
  let quote = "Quick are the mouths of earth, and quick are the teeth that feed upon this loveliness.";
  let quote_author = "Thomas Wolfe";
  let images = [];
  let galleryLocation = "galleries/neotropical";

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