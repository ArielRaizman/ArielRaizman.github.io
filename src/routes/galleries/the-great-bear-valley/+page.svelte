<script>
  import { onMount } from 'svelte';
  import Masonry from 'svelte-bricks';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Banner from '../../../lib/components/Banner.svelte';  
  import metadata from '../../../lib/assets/galleries/bear/bear.json';

  import Footer from '../../../lib/components/Footer.svelte';


  import headerUrl from '../../../lib/assets/galleries/bear.jpg';

  let pageName = "The Great Bear Valley";
  let quote = "I don't hear the silence of death, I hear water.";
  let quote_author = "Aidin Robbins";
  let images = [];
  onMount(async () => {
      const imageFiles = import.meta.glob('/src/lib/assets/galleries/bear/*.{jpg,png}');
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