<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import Banner from '../../lib/components/Banner.svelte';
  import headerUrl from '../../lib/assets/gallery_header.jpg';
  import masterImageData from '../../lib/assets/image-data.json';
  import { base } from '$app/paths';

  // Dynamically import all images in the assets folder #todo, is this standard? surely there is a better way to do this
  const imageModules = import.meta.glob('../../lib/assets/*.{jpg,jpeg,png,gif,webp}', {eager: true, as: 'url'});

  let pageName = "Galleries";

  // Define galleries
  let galleries = [
    {
      name: "Cascadia",
      description: "Description for gallery two.",
      location: "galleries/cascadia"
    },
    {
      name: "The Great Bear Valley",
      description: "Description for gallery two.",
      location: "galleries/bear"
    },
    {
      name: "The Central Valley",
      description: "Description for gallery two.",
      location: "galleries/valley"
    },
    {
      name: "Low Tide",
      description: "Description for gallery one.",
      location: "galleries/tide"
    },
    {
      name: "Central Bay",
      description: "Description for gallery two.",
      location: "galleries/bay"
    },
    {
      name: "Neotropical",
      description: "Description for gallery two.",
      location: "galleries/neotropical"
    }
  ].filter(gallery => {
    // Find banner image for this gallery from metadata
    const bannerImage = masterImageData.find(img => 
      img.location === gallery.location && 
      img.banner_image === true && 
      img.active === true
    );
    
    if (!bannerImage) {
      console.warn(`Gallery "${gallery.name}" failed to load - missing banner image.`);
      return false;
    }
    // Dynamically resolve the image URL using import.meta.glob
    const imagePath = `../../lib/assets/${bannerImage.image_name}`;
    const imageUrl = imageModules[imagePath];
    if (!imageUrl) {
      console.warn(`Image file not found for ${imagePath}`);
      return false;
    }
    gallery.image = {
      url: imageUrl,
      location: gallery.location
    };
    return true;
  });
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
.gallery-info {
  font-family:'Times New Roman', Times, serif;
  color: RGB(50,50,50);
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