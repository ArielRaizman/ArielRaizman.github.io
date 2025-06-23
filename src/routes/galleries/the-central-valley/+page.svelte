<script>
  import { onMount } from 'svelte';
  import Masonry from 'svelte-bricks';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import Footer from '../../../lib/components/Footer.svelte';

  import headerUrl from '../../../lib/assets/valley.jpg';

  let pageName = "The Central Valley";
  let quote = "The ultimate value in these marshes is wildness, and the crane is wildness incarnate.";
  let quote_author = "Aldo Leopold";
  let images = [];
  let galleryLocation = "galleries/valley";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />