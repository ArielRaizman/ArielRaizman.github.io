<script>
  import instagram from '../assets/icons/Instagram_Glyph_White.svg';
  let links = ["About", "Galleries", "Blog", "Contact"];
  let isMenuOpen = false;
  let menuToggle;

  function closeMenu(restoreFocus = false) {
    isMenuOpen = false;
    if (restoreFocus) menuToggle?.focus();
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<svelte:window on:keydown={(event) => {
  if (event.key === "Escape" && isMenuOpen) closeMenu(true);
}} />

<header class="nav-list">
  <div class="logo"><a href="/">Ariel Raizman</a></div>
  <button class="menu-toggle" bind:this={menuToggle} on:click={toggleMenu} aria-label="Toggle Menu" aria-expanded={isMenuOpen} aria-controls="site-navigation">
    {#if isMenuOpen}
      ✕ <!-- Close icon -->
    {:else}
      ☰ <!-- Hamburger icon -->
    {/if}
  </button>
  <nav id="site-navigation" class:is-open={isMenuOpen}>
    <button class="menu-close" on:click={() => closeMenu(true)} aria-label="Close Menu">✕</button>
    <ul>
      {#each links as link}
        <li><a href={`/${link.toLowerCase()}`} on:click={() => closeMenu()}>{link}</a></li>
      {/each}
      <li class="instagram-link">
        <a href="https://www.instagram.com/arl.takes.pics/" target="_blank">
          <img src={instagram} alt="Instagram">
        </a>
      </li>
    </ul>
  </nav>
</header>

<style>
  @import '../assets/styles/styles.css';

  * {
    font-family: 'Arial', sans-serif; 
  }
  header.nav-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    position: relative;
    z-index: 1000;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    
  }

  nav {
    display: flex;
    align-items: center;
  }

  nav ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1rem;
  }

  nav ul li a {
    text-decoration: none;
    font-size: 1rem;
    color: white;
  }

  nav ul .instagram-link a {
    display: inline-block;
    width: 24px;
    height: 24px;
  }

  nav ul .instagram-link img {
    width: 24px;
    height: 24px;
  }
  .menu-close {
    display: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
  }

  /* Mobile responsiveness */
  @media screen and (max-width: 768px) {
    .menu-toggle {
      display: block;
    }

    nav {
      display: none; /* Initially hide the navigation */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    nav.is-open {
      display: flex; /* Show nav when open */
    }

    nav ul {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    nav ul li a {
      font-size: 1.5rem;
      color: white;
    }

    nav ul .instagram-link a {
      width: 32px;
      height: 32px;
    }

    nav ul .instagram-link img {
      width: 32px;
      height: 32px;
    }
    .menu-close {
      display: block;
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
    }
  }
    

  @media screen and (max-width: 480px) {
    nav ul li a {
      font-size: 1.2rem;
    }

    .menu-toggle {
      font-size: 1.2rem;
    }
  }
</style>
