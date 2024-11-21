<script>
    import { onMount } from 'svelte';
    import Masonry from 'svelte-bricks';

    export let images = [];
    export let quote = "quote";
    export let quote_author = "quote_author";
    
    let selectedImage = null;
    let nColumns = 5; 
    let gap = 20; 
    let minColWidth = 400; 
    let maxColWidth = 1600; 
  
    let width = 0; 
  </script>
  
  <section class="description">
    <div>
      <p>{quote}</p>
      <h1>{quote_author}</h1>
    </div>
  </section>
  
  <section class="gallery">
    <Masonry
      items={images}
      idKey="src"
      let:item
      {minColWidth}
      {maxColWidth}
      {gap}
      animate={true}
      duration={300}
    >
      <div class="gallery-item" on:click={() => (selectedImage = item)}>
        <img src={item.src} alt="Gallery" loading="lazy" />
      </div>
    </Masonry>
  </section>
  
  {#if selectedImage}
    <div class="lightbox" on:click={() => (selectedImage = null)}>
      <img src={selectedImage.src} alt="Selected Image" />
    </div>
  {/if}
  
  <style>
    @import '../../styles.css';
    .description {
      padding: 50px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      color: black;
    }
  
    .description div {
      display: inline-flex;
      flex-direction: column; 
      align-items: flex-end; 
    }
  
    .description p {
      font-size: 1.5rem;
      font-family: 'Georgia', serif;
      font-style: italic;
      margin: 0; 
      padding: 0; 
      line-height: 1.2; 
    }
  
    .description h1 {
      font-size: 1rem;
      font-family: 'Georgia', serif;
      font-style: oblique;
      margin: 0; 
      padding-top: 10px; 
      align-self: flex-end; 
    }
    .gallery {
      padding: 20px;
    }
  
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    .gallery-item {
      transition: transform 0.3s ease;
      cursor: pointer;
      width: 100%;
      overflow: hidden;
    }
  
    .gallery-item:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  
    .lightbox img {
      max-width: 90%;
      max-height: 90%;
    }
  </style>