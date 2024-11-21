<script>
    let links = ["About", "Galleries", "Blog", "Contact"];
    export let pageName = "Home"; // Define and export pageName
    export let headerUrl = "../assets/galleries/gallery_header.jpg";
    // const updateHeaderUrl = () => {
    //     if (window.innerWidth < 768) {
    //         headerUrl = "../assets/galleries/gallery_header_mobile.jpg";
    //     } else {
    //         headerUrl = "../assets/galleries/gallery_header.jpg";
    //     }
    // };
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
    @import '../assets/styles/styles.css';
  
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

  @media screen and (max-width: 768px) {
        header.nav-list {
            flex-direction: column;
            align-items:flex-start;
            gap: 0.5rem; /* Add this to reduce the vertical gap between elements */
        /* padding: 0.5rem 1rem; Reduce padding for smaller screens */
        }

        nav ul {
            flex-direction: row;
            gap: 0.5rem;
            width: 100%;
        }

        nav ul li {
            text-align: left;
        }

        section {
            height: 50vh; 
        }

        .overlay {
            font-size: 1.5rem; 
        }
        .logo {
          padding-left: 0.8rem;
          padding-bottom: -2;
        }
    }

    @media screen and (max-width: 480px) {
        .overlay {
            font-size: 1.2rem; 
            padding: 0 1rem;
        }

        nav ul {
            gap: 0.5rem;
        }

        nav ul li a {
            font-size: 0.9rem;
        }
    }
    </style>