<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import masterImageData from '../../../lib/assets/image-data.json';

  let pageName = "Central Bay";
  let quote = "The bay is a looking glass into both the past and future of our world.";
  let quote_author = "John Hart";
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

  const headerUrl = bannerImage ? `/src/lib/assets/${bannerImage.image_name}` : '';
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />
