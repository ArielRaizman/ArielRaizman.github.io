<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/galleries/tide.jpg';

  let pageName = "Low Tide";
  let quote = "It is advisable to look from the tide pool to the stars and then back to the tide pool again.";
  let quote_author = "John Steinbeck";
  let images = [];
  onMount(async () => {
      const imageFiles = import.meta.glob('/src/lib/assets/galleries/tide/*.{jpg,png}');
      for (const path in imageFiles) {
        const image = await imageFiles[path]();
        images = [...images, { src: image.default }];
      }
    });
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery {images} {quote} {quote_author} />
<Footer />
