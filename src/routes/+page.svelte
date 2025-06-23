<script>
  import Footer from '../lib/components/Footer.svelte';
  import Header from '../lib/components/Header.svelte';
  
</script>

<main>
  <Header />

  <section class="hero">
    <div class="overlay">
      <h1>Ariel Raizman</h1>
      <h2>Nature Photography</h2>
    </div>
  </section>
  <section>

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
</style>
