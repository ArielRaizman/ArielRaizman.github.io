<script>
  import { onMount, onDestroy } from 'svelte';

  export let pageName = "Home";
  export let headerUrl = "../assets/gallery_header.jpg";
  export let mobileHeaderUrl = "";

  let isMobile = false;
  let currentHeaderUrl = headerUrl;
  
  // Calculate font size based on string length and device type
  $: fontSize = calculateFontSize(pageName, isMobile);
  
  function calculateFontSize(text, mobile) {
    if (mobile) {
      // Mobile font sizing with smaller values
      if (text.length <= 8) return '3rem';
      else if (text.length <= 15) return '2.5rem';
      else return '2rem'; // Even smaller for long text on mobile
    } else {
      // Desktop font sizing (unchanged)
      if (text.length <= 10) return '4rem';
      else if (text.length <= 15) return '3rem';
      else return '3rem';
    }
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
    height: {isMobile ? '40vh' : '45vh'};
    background-color: rgba(0, 0, 0, 0.30);
    background-blend-mode: darken;
  "
>
  <div class="overlay" class:mobile={isMobile}>
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
    width: 90%;
  }
  
  .mobile {
    top: 70%; /* Position higher on mobile */
  }
  
  /* Additional styling for longer text on mobile */
  @media (max-width: 768px) {
    .overlay h1 {
      margin: 0;
      padding: 0 15px;
      word-wrap: break-word;
    }
  }
</style>
