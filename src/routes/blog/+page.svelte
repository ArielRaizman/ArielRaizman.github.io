<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import Banner from '../../lib/components/Banner.svelte';
  export let data;
  $: headerUrl = data.pageHeader;
  let pageName = "Blog";
</script>

<svelte:head>
  <title>{pageName} — Ariel Raizman</title>
</svelte:head>

<Header />
<Banner {pageName} {headerUrl} />
<section>
  <div>
    <p><a class="link underline" href="/blog/central-coast-tidepooling">Tidepooling in California's Central Coast</a></p>
  </div>
  <div>
    <p><a class="link underline" href="/blog/public-lands-day">Happy National Public Lands Day!</a></p>
  </div>
</section>
<Footer />

<style>
  @import '../../lib/assets/styles/styles.css';
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 50vh;
    padding: 2rem 0;
    text-align: center;
  }
  p {
    font-size: 2rem;
    margin: 0;
  }
  .underline {
    text-decoration: underline;
    cursor: pointer;
  }
</style>