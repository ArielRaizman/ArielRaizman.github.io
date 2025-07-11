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

    const bestImageData = masterImageData.filter(img => img.best === true);
    
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
  <section>
    <div class="content home-description">
      <h1>Welcome!</h1>
      <p>
        I am a nature photographer based along the west coast of the United States. My work focuses on all walks of life, highlighting the intricate and delicate ecosystems that exist both in remote parts of the world and in our backyards.
      </p>
      <p class="favorites-note">
        Explore some of my favorite photos below. This selection changes often as I capture new moments and my inspirations evolve.
      </p>
    </div>
  </section>
  <section class="best-gallery">
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

  .content {
    padding: 50px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    color: black;
  }

  .home-description {
    max-width: 700px;
    margin: 0 auto 2rem auto;
    padding: 40px 20px;
    background: none;
    border-radius: 0;
    box-shadow: none;
    text-align: center;
  }

  .home-description h1 {
    font-size: 2em;
    margin-bottom: 20px;
    font-family: 'Georgia', serif;
  }

  .home-description p {
    font-size: 1.2em;
    line-height: 1.8;
    margin-bottom: 20px;
    font-family: 'Georgia', serif;
  }

  .home-description .favorites-note {
    font-style: italic;
    color: #444;
    font-size: 1.08em;
    margin-top: 0.5rem;
  }

  .favorites-note {
    font-style: italic;
    margin-top: 10px;
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

  /* Responsive */
  @media (max-width: 768px) {
    .home-description {
      padding: 20px 5px;
    }
    .home-description h1 {
      font-size: 1.5em;
    }
    .home-description p {
      font-size: 1em;
    }
  }
</style>
