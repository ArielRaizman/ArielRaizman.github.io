<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Banner from '$lib/components/Banner.svelte';
  import Gallery from '$lib/components/Gallery.svelte';

  export let data;
  $: gallery = data.gallery;
</script>

<Header />
<Banner pageName={gallery.name} headerUrl={gallery.banner} />
<Gallery {gallery} />
<Footer />
