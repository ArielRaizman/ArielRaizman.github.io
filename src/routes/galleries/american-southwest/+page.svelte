<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import headerUrl from '../../../lib/assets/southwest.jpg';
  import Banner from '../../../lib/components/Banner.svelte';

  let pageName = "American Southwest";
  let quote = " ";
  let quote_author = " ";
  let images = [];
  let galleryLocation = "galleries/southwest";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />
