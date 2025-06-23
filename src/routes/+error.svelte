<script>
    import Header from '../lib/components/Header.svelte';
    import Footer from '../lib/components/Footer.svelte';
    import Banner from '../lib/components/Banner.svelte';
    import headerUrl from '../lib/assets/gallery_header.jpg';
    let pageName = "404 - Page Not Found";
  </script>
  
  <Header />
  <Banner {pageName} {headerUrl} />
  <section class="not-found">
    <!-- <h1>404 - Page Not Found</h1> -->
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/">Go back to the homepage</a>
  </section>
  
  <Footer />
  
  <style>
    @import '../lib/assets/styles/styles.css';
    
    .not-found {
      text-align: center;
      padding: 50px;
    }
  
    .not-found h1 {
      font-size: 2em;
      margin-bottom: 20px;
    }
  
    .not-found p {
      font-size: 1.2em;
      margin-bottom: 20px;
    }
  
    .not-found a {
      font-size: 1em;
      color: #0070f3;
      text-decoration: none;
    }
  
    .not-found a:hover {
      text-decoration: underline;
    }
  </style>