<script>
  import Footer from '../lib/components/Footer.svelte';
</script>

<main>
  <header class="nav-list">
    <div class="logo"><a href="/">Ariel Raizman</a></div>
    <nav>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/galleries">Galleries</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>  
  </header>

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
  @import '../styles.css';

  /* Hero Section */
  .hero {
    position: relative;
    height: 100vh;
    background: url('../lib/assets/home/home_img.jpg') no-repeat center center/cover;
    background-color: rgba(0, 0, 0, 0.25);
    background-blend-mode: darken;
  }

  @media (max-width: 768px) {
    .hero {
      background: url('../lib/assets/home/home_img_mobile.jpg') no-repeat center center/cover;
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
    color:white;
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
