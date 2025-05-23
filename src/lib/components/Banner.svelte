<script>
  import { onMount, onDestroy } from 'svelte';

  export let pageName = "Home";
  export let headerUrl = "../assets/galleries/gallery_header.jpg";
  export let mobileHeaderUrl = "";

  let isMobile = false;
  let currentHeaderUrl = headerUrl;
  
  // Calculate font size based on string length
  $: fontSize = calculateFontSize(pageName);
  
  function calculateFontSize(text) {
    // Base case
    if (text.length <= 10) return '4rem';
    // else if (text.length <= 10) return '3.5rem';
    else if (text.length <= 15) return '3rem';
    // else if (text.length <= 20) return '2.5rem';
    else return '3rem'; // Minimum size for very long strings
  }

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
    height:45vh;
    background-color: rgba(0, 0, 0, 0.30);
    background-blend-mode: darken;
  "
>
  <div class="overlay">
    <h1 style="font-size: {fontSize};">{pageName}</h1>
  </div>
</section>

<style>
  @import '../assets/styles/styles.css';

  .overlay {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'Georgia', serif;
    color: white;
  }
</style>
