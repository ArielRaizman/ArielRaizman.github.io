<script>
  import { onMount } from 'svelte';
  import Footer from '../lib/components/Footer.svelte';
  import Header from '../lib/components/Header.svelte';
  import ImageGallery from '../lib/components/ImageGallery.svelte';
  import masterImageData from '../lib/assets/image-data.json';
  import homeImg from '$lib/assets/home_img.jpg';
  import homeImgMobile from '$lib/assets/home_img_mobile.jpg';

  let currentBgImage = homeImg;

  // Use Vite's glob import for gallery images
  const imageFiles = import.meta.glob('../lib/assets/*.{jpg,jpeg,png}', { eager: true });

  let bestImages = [];

  onMount(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = (e) => {
      currentBgImage = e.matches ? homeImgMobile : homeImg;
    };
    mediaQuery.addEventListener('change', handleResize);
    handleResize(mediaQuery);

    const bestImageData = masterImageData.filter(img => img.Other === 'best');
    
    bestImages = bestImageData.map(img => {
      const imagePath = `../lib/assets/${img.image_name}`;
      // console.log('Trying to load:', imagePath);
      // console.log('Available images:', Object.keys(imageFiles));
      const imageModule = imageFiles[imagePath];
      if (!imageModule) {
        console.error(`Image not found: ${imagePath}`);
        return null;
      }
      return {
        src: imageModule.default,
        title: img.title || '',
        location: img.location || '',
        link: img.link || ''
      };
    }).filter(Boolean); // Remove any null entries

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  });
</script>

<main>
  <Header />

  <section class="hero" style="background-image: url({currentBgImage})">
    <div class="overlay">
      <h1>Ariel Raizman</h1>
      <h2>Nature Photography</h2>
    </div>
  </section>
  <section class="best-gallery">
    <h2>Featured Work</h2>
    <ImageGallery images={bestImages} />
  </section>
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
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.25);
    background-blend-mode: darken;
  }

  @media (max-width: 768px) {
    .hero {
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
