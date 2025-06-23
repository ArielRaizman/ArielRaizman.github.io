<script>
  import { onMount } from 'svelte';
  import Masonry from 'svelte-bricks';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Banner from '../../../lib/components/Banner.svelte';  

  import Footer from '../../../lib/components/Footer.svelte';


  import headerUrl from '../../../lib/assets/bear.jpg';

  let pageName = "The Great Bear Valley";
  let quote = "I don't hear the silence of death, I hear water.";
  let quote_author = "Aidin Robbins";
  let images = [];
  let galleryLocation = "galleries/bear";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />