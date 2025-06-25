<script>
  import { onMount } from 'svelte';
  import Footer from '../lib/components/Footer.svelte';
  import Header from '../lib/components/Header.svelte';
  import ImageGallery from '../lib/components/ImageGallery.svelte';
  import masterImageData from '../lib/assets/image-data.json';

  let bestImages = [];

  onMount(() => {
    // Filter for images with Other: best
    const bestImageData = masterImageData.filter(img => img.Other === 'best');
    
    // Format images for the gallery using static paths
    bestImages = bestImageData.map(img => ({
      src: `/src/lib/assets/${img.image_name}`,
      title: img.title || '',
      location: img.location || '',
      link: img.link || ''
    }));
  });
</script>

<main>
  <Header />

  <section class="hero">
    <div class="overlay">
      <h1>Ariel Raizman</h1>
      <h2>Nature Photography</h2>
    </div>
  </section>
  <!-- <section class="best-gallery">
    <h2>Featured Work</h2>
    <ImageGallery images={bestImages} />
  </section> -->
  <Footer />
</main>

<style>
  @import '../lib/assets/styles/styles.css';

  main {
    margin: 0;
    padding: 0;
  }

  /* Hero Section */
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../lib/assets/home_img.jpg') no-repeat center center/cover;
    background-color: rgba(0, 0, 0, 0.25);
    background-blend-mode: darken;
  }

  @media (max-width: 768px) {
    .hero {
      background: url('../lib/assets/home_img_mobile.jpg') no-repeat center center/cover;
      background-color: rgba(0, 0, 0, 0.25);
      background-blend-mode: darken;
    }
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'Georgia', serif;
    color: white;
  }

  .overlay h1 {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  .overlay h2 {
    font-size: 2rem;
    font-weight: normal;
  }

  .description {
    padding: 50px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    color: black;
  }

  .best-gallery {
    margin: 2rem auto;
    max-width: 1600px;
  }

  .best-gallery h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #333;
  }
</style>
