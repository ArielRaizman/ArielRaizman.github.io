<script>
  import { onMount } from "svelte";
  import Header from "../../../lib/components/Header.svelte";
  import ImageGallery from "../../../lib/components/ImageGallery.svelte";
  import Footer from "../../../lib/components/Footer.svelte";
  import Banner from "../../../lib/components/Banner.svelte";
  import masterImageData from "../../../lib/assets/media_manager/images/image-data.json";

  let pageName = "Neotropical";
  let quote =
    "Quick are the mouths of earth, and quick are the teeth that feed upon this loveliness.";
  let quote_author = "Thomas Wolfe";
  let galleryLocation = "galleries/neotropical";

  // Define the order of locations to display
  const locationOrder = ["Amazon Basin", "Cloud Forest", "Galápagos"];

  // Location subtitles
  const locationSubtitles = {
    // "Tambopata": "Southeastern Peru",
    // "Finca Las Piedras": "Terra Firme, On the Castaña Corridor.",
    // "Galápagos": "Archipelago",
    // "Mindo": "Northwestern Ecuador",
    // "Bellavista": "Chocó Andino de Pichincha",
    // "Cuyabeno": "Flooded Forest",
    // "Yasuní": "Heartbeat of the Earth",
    // "Rio Bigal": "As the Andes crumble into the Amazon, Volcán Sumaco feeds a transition point between the lush mountain soil and Amazonian diversity, it's waters on a journey destined for the Río Napo",
    // "Yanayacu": "Northern Ecuador",
    // "Natal": "Northeastern Brazil"
    "Amazon Basin": "ya",
    "Cloud Forest": "ya",
    Galápagos: "ya",
  };

  // Grouped images by location
  let imagesByLocation = {};
  let bestImages = [];

  // Find banner image from metadata
  const bannerImage = masterImageData.images.find(
    (img) =>
      img.site_location === galleryLocation &&
      img.banner_image === true &&
      img.active === true,
  );

  if (!bannerImage) {
    console.warn(
      `Gallery "${pageName}" failed to load - missing banner image.`,
    );
  }

  const headerUrl = bannerImage
    ? new URL(
        `../../../lib/assets/media_manager/images/files/${bannerImage.file_name}`,
        import.meta.url,
      ).href
    : "";

  onMount(() => {
    // Load best images from this gallery
    const bestImagesData = masterImageData.images.filter(
      (img) =>
        img.site_location === galleryLocation &&
        img.active === true &&
        img.location_best === true,
    );

    bestImages = bestImagesData.map((imageData) => {
      const imageUrl = new URL(
        `../../../lib/assets/media_manager/images/files/${imageData.file_name}`,
        import.meta.url,
      ).href;
      return {
        src: imageUrl,
        title: imageData.image_name || "",
        location: imageData.location || "",
        link: "",
      };
    });

    // Filter and group active neotropical images by location
    const neotropicalImages = masterImageData.images.filter(
      (img) =>
        img.site_location === galleryLocation &&
        img.active === true &&
        img.location &&
        img.location.trim() !== "",
    );

    // Group images by location
    neotropicalImages.forEach((imageData) => {
      const location = imageData.location;
      if (!imagesByLocation[location]) {
        imagesByLocation[location] = [];
      }

      const imageUrl = new URL(
        `../../../lib/assets/media_manager/images/files/${imageData.file_name}`,
        import.meta.url,
      ).href;
      imagesByLocation[location].push({
        src: imageUrl,
        title: imageData.image_name || "",
        location: imageData.location || "",
        link: "",
      });
    });

    // Trigger reactivity
    imagesByLocation = imagesByLocation;
  });
</script>

<Header />
<Banner {pageName} {headerUrl} />

<section class="description">
  <div>
    <p>{quote}</p>
    <h1>{quote_author}</h1>
  </div>
</section>

{#if bestImages.length > 0}
  <section class="best-images-section">
    <ImageGallery images={bestImages} />
    <p class="best-images-subtitle">something</p>
    <hr class="section-divider" />
  </section>
{/if}

{#each locationOrder as location}
  {#if imagesByLocation[location] && imagesByLocation[location].length > 0}
    <section class="location-section">
      <h2 class="location-subtitle">{location}</h2>
      <p class="location-subsubtitle">{locationSubtitles[location]}</p>
      <ImageGallery images={imagesByLocation[location]} />
    </section>
  {/if}
{/each}

<div class="navigation-buttons">
  <a href="/galleries/american-southwest"><button>Previous</button></a>
  <a href="/galleries"><button>Galleries</button></a>
  <a href="/galleries/central-bay"><button>Next</button></a>
</div>

<Footer />

<style>
  @import "../../../lib/assets/styles/styles.css";
</style>
