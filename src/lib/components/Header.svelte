<script>
    let links = ["About", "Galleries", "Blog", "Contact"];
    export let pageName = "Home"; // Define and export pageName
    export let headerUrl = "../assets/galleries/gallery_header.jpg";
  </script>

  
<header class="nav-list">
    <div class="logo"><a href="/">Ariel Raizman</a></div>
    <nav>
      <ul>
        {#each links as link}
          <li><a href={`/${link.toLowerCase()}`}>{link}</a></li>
        {/each}
      </ul>
    </nav>  
  </header>
  
<section style="
    background: url({headerUrl}) no-repeat center center/cover; 
    position: relative;
    height: 60vh;
    background-color: rgba(0, 0, 0, 0.20);
    background-blend-mode: darken;">

    <div class="overlay">
      <h1>{pageName}</h1>
    </div>
  </section>
  
  <style>
    @import '../../styles.css';
  
  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'Georgia', serif;
    color:white;
    font-size: 2rem;  
  }
    </style>