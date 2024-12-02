<script>
  import { onMount, onDestroy } from 'svelte';

  export let pageName = "Home";
  export let headerUrl = "../assets/galleries/gallery_header.jpg";
  export let mobileHeaderUrl = "";

  let isMobile = false;
  let currentHeaderUrl = headerUrl;

  // Function to update the mobile state
  const updateIsMobile = () => {
    if (typeof window !== 'undefined') {
      isMobile = window.matchMedia("(max-width: 768px)").matches;
      currentHeaderUrl = isMobile && mobileHeaderUrl ? mobileHeaderUrl : headerUrl;
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateIsMobile);
    }
  });
</script>

<section
  style="
    background: url({currentHeaderUrl}) no-repeat center center/cover;
    position: relative;
    height: 60vh;
    background-color: rgba(0, 0, 0, 0.20);
    background-blend-mode: darken;
  "
>
  <div class="overlay">
    <h1>{pageName}</h1>
  </div>
</section>

<style>
  @import '../assets/styles/styles.css';

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'Georgia', serif;
    color: white;
    font-size: 2rem;
  }
</style>
