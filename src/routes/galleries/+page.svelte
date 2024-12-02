<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import Banner from '../../lib/components/Banner.svelte';
  import Bear from "./../../lib/assets/galleries/bear.jpg";
  import Tide from "./../../lib/assets/galleries/tide.jpg";
  import Cascadia from "./../../lib/assets/galleries/cascadia.jpg";
  import headerUrl from '../../lib/assets/galleries/gallery_header.jpg';
  import Bay from "./../../lib/assets/galleries/bay.jpg";
  import Southwest from "./../../lib/assets/galleries/southwest.jpg";
  import Valley from "./../../lib/assets/galleries/valley.jpg";
  
  let pageName = "Galleries";
  let galleries = [
    {
    name: "Low Tide",
    description: "Description for gallery one.",
    image: {
      url: Tide
    }
    },
    {
    name: "The Great Bear Valley",
    description: "Description for gallery two.",
    image: {
      url: Bear
    }
    },
    {
    name: "The Central Valley",
    description: "Description for gallery two.",
    image: {
      url: Valley
    }
    },
    // {
    //   name: "Cascadia",
    //   description: "Description for gallery two.",
    //   image: {
    //     url: Cascadia
    //   }
    // },
    // {
    //   name: "Central Bay",
    //   description: "Description for gallery two.",
    //   image: {
    //     url: Bay
    //   }
    // },
    // {
    //   name: "American Southwest",
    //   description: "Description for gallery two.",
    //   image: {
    //     url: Southwest
    //   }
    // },
  ];
  </script>
  
  <Header />
  <Banner {pageName} {headerUrl} />

  <!-- <section class="description">
  <div>
    <h1>Welcome lol</h1>
  </div>
  </section> -->
  
  <section class="gallery">
  {#each galleries as gallery}
    <a href={`/galleries/${gallery.name.toLowerCase().replace(/\s+/g, '-')}`} class="gallery-item">
    <div class="gallery-image">
      <img src={gallery.image.url} alt={gallery.name} />
    </div>
    <div class="gallery-info">
      <h2>{gallery.name}</h2>
    </div>
    </a>
  {/each}
  </section>

  <Footer />

  <style>
  @import '../../lib/assets/styles/styles.css';
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 2rem;
    color:black;
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    transition: transform 0.3s ease;
    text-align: center;      
  }

  .gallery-image {
    position: relative;
    overflow: hidden;
  }

  .gallery-image img {
    width: 100%;
    height: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .gallery-item:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    .gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .gallery {
    grid-template-columns: 1fr;
    gap: 1rem;
    }
  }
  </style>