<script>
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/galleries/cascadia.jpg';
  import metadata from '../../../lib/assets/galleries/cascadia/cascadia.json';


  let pageName = "Cascadia";
  let quote = "I want to see mountains again, Gandalf, mountains, and then find somewhere where I can rest.";
  let quote_author = "J.R.R. Tolkien";
  let images = [];
  onMount(async () => {
      const imageFiles = import.meta.glob('/src/lib/assets/galleries/cascadia/*.{jpg,png}');
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
