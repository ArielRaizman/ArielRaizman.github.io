<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/tide.jpg';
  import metadata from '../../../lib/assets/tide/tide.json';

  let pageName = "Low Tide";
  let quote = "It is advisable to look from the tide pool to the stars and then back to the tide pool again.";
  let quote_author = "John Steinbeck";
  let images = [];
  let galleryLocation = "galleries/tide";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />
