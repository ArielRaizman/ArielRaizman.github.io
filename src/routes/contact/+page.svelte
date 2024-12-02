<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import Banner from '../../lib/components/Banner.svelte';
  import headerUrl from '../../lib/assets/galleries/gallery_header.jpg';
  let pageName = "Contact";
</script>

<Header />
<Banner {pageName} {headerUrl} />
<section>
  <div class="content">
    <!-- <h2>Email</h2> -->
    <p>
      For any queries or feedback, please feel free to reach out to me at <b class="hover-grow">ariel.raizman@gmail.com</b> or through <a href="https://www.instagram.com/arl.takes.pics/" target="_blank" class="hover-grow"><b>Instagram</b></a>.
    </p>
</section>
<Footer />

<style>
 section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  h2 {
    font-family: 'Arial', sans-serif;
    font-size: 2em;
    /* margin-bottom: 20px; */
    /* text-transform: uppercase; */
    /* letter-spacing: 2px; */
  }

  p {
    font-size:  1.5em;
    /* line-height: 1.8; */
    /* margin-bottom: 20px; */
  }

  .content {
    flex: 1;
    padding-right: 20px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .hover-grow {
    transition: all 0.2s;
  }

  .hover-grow:hover {
    transform: scale(1.1);
  }
</style>
