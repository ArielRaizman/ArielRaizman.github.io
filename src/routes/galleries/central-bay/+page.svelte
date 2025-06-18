<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/galleries/bay.jpg';
  import metadata from '../../../lib/assets/galleries/bay/bay.json';

  let pageName = "Central Bay";
  let quote = "The fog comes in on little cat's feet. It sits looking over harbor and city on silent haunches and then moves on.";
  let quote_author = "Carl Sandburg";
  let images = [];
  onMount(async () => {
      const imageFiles = import.meta.glob('/src/lib/assets/galleries/bay/*.{jpg,png}');
      for (const path in imageFiles) {
        const image = await imageFiles[path]();
        const imageName = path.split('/').pop();
        const imageMetadata = metadata.find(meta => meta.filename === imageName);
        images = [...images, { src: image.default, ...imageMetadata }];
      }
    });
</script>

<Header />
<Banner {pageName} {headerUrl} />
<Gallery {images} {quote} {quote_author} />
<Footer />
