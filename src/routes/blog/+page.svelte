<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import Banner from '../../lib/components/Banner.svelte';
  import headerUrl from '../../lib/assets/galleries/gallery_header.jpg';
  let pageName = "Blog";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<section>
  <p>working on it :)</p>
</section>
<Footer />

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  p {
    font-size: 2rem;
  }
</style>