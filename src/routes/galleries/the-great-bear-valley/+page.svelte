<script>
  import { onMount } from 'svelte';
  import Masonry from 'svelte-bricks';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import masterImageData from '../../../lib/assets/image-data.json';

  let pageName = "The Great Bear Valley";
  let quote = "In wildness is the preservation of the world.";
  let quote_author = "Henry David Thoreau";
  let galleryLocation = "galleries/bear";

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