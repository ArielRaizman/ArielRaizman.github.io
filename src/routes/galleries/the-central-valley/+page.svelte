<script>
  import { onMount } from 'svelte';
  import Masonry from 'svelte-bricks';
  import Header from '../../../lib/components/Header.svelte';
  import Gallery from '../../../lib/components/Gallery.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import metadata from '../../../lib/assets/galleries/valley/valley.json';

  import headerUrl from '../../../lib/assets/galleries/valley.jpg';

  let pageName = "The Central Valley";
  let quote = "The ultimate value in these marshes is wildness, and the crane is wildness incarnate.";
  let quote_author = "Aldo Leopold";
  let images = [];
  onMount(async () => {
      const imageFiles = import.meta.glob('/src/lib/assets/galleries/valley/*.{jpg,png}');
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