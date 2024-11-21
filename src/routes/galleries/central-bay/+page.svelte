<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import headerUrl from '../../../lib/assets/galleries/bay.jpg';

  let pageName = "Central Bay";
  let quote = " ";
  let quote_author = " ";
  let images = [];
  onMount(async () => {
      const imageFiles = import.meta.glob('/src/lib/assets/galleries/bay/*.{jpg,png}');
      for (const path in imageFiles) {
        const image = await imageFiles[path]();
        images = [...images, { src: image.default }];
      }
    });
</script>

<Header {pageName} {headerUrl} />
<Gallery {images} {quote} {quote_author} />
<Footer />
