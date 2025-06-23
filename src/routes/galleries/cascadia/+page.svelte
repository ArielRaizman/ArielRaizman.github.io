<script>
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/cascadia.jpg';

  let pageName = "Cascadia";
  let quote = "I want to see mountains again, Gandalf, mountains, and then find somewhere where I can rest.";
  let quote_author = "J.R.R. Tolkien";
  let galleryLocation = "galleries/cascadia";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery location={galleryLocation} {quote} {quote_author} />
<Footer />
