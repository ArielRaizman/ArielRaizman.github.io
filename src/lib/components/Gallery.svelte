<script>
  import ImageGallery from './ImageGallery.svelte';

  // A resolved gallery from `$lib/data.js`:
  // { name, slug, quote, quote_author, description, banner, photos, prev, next }.
  export let gallery;
</script>

<section class="description">
  <div>
    <p>{gallery.quote}</p>
    <h1>{gallery.quote_author}</h1>
  </div>
</section>

<ImageGallery images={gallery.photos} />

<div class="navigation-buttons">
  <a href="/galleries/{gallery.prev}"><button>Previous</button></a>
  <a href="/galleries"><button>Galleries</button></a>
  <a href="/galleries/{gallery.next}"><button>Next</button></a>
</div>

<style>
  @import '../assets/styles/styles.css';
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

  .navigation-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .navigation-buttons button {
    padding: 10px 20px;
    padding-bottom: 12px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    background-color: #333;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    min-width: 200px;
  }

  .navigation-buttons button:hover {
    background-color: #555;
  }

  @media (max-width: 600px) {
    .navigation-buttons {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .navigation-buttons button {
      max-width: 30px;
      width: 50%;
      max-width: none;
    }
  }
</style>