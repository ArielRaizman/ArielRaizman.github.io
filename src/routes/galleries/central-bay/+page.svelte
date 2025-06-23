<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/bay.jpg';
  import metadata from '../../../lib/assets/bay/bay.json';

  let pageName = "Central Bay";
  let quote = "The fog comes in on little cat's feet. It sits looking over harbor and city on silent haunches and then moves on.";
  let quote_author = "Carl Sandburg";
  let images = [];
  let galleryLocation = "galleries/bay";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />
