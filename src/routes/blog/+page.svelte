<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import Banner from '../../lib/components/Banner.svelte';
  import headerUrl from '../../lib/assets/gallery_header.jpg';
  let pageName = "Blog";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<section>
  <div>
    <p class="link underline" on:click={() => window.location.href = `/blog/central-coast-tidepooling`}>Tidepooling in California's Central Coast</p>
  </div>
  <div>
    <p class="link underline" on:click={() => window.location.href = `/blog/public-lands-day`}>Happy National Public Lands Day!</p>
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