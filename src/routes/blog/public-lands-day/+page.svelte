<script>
  import Header from '../../../lib/components/Header.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/_DSC8955.jpg';
  
  import photo1 from "../../../lib/assets/_DSC8955.jpg";
  import photo2 from "../../../lib/assets/_DSC9948.jpg";
  import photo3 from "../../../lib/assets/_DSC0498.jpg";
  import photo4 from "../../../lib/assets/_DSC1926.jpg";
  import photo5 from "../../../lib/assets/_DSC1857.jpg";
  import photo6 from "../../../lib/assets/_DSC2598-Enhanced-NR.jpg";
  import photo7 from "../../../lib/assets/_DSC1691-2.jpg";
  import photo8 from "../../../lib/assets/_DSC8303-Enhanced-NR.jpg";
  
  let pageName = "Happy National Public Lands Day!";
</script>

<Header />
<Banner {pageName} {headerUrl} />

<section>
  <div class="content">
    <p>
      Every year, on the fourth Saturday of September, the United States come together and celebrate our public lands, bringing thousands of volunteers to help restore and steward the US's public lands.
    </p>
    
    <div class="side-by-side-image">
      <div class="image-container">
        <img src={photo2} alt="Inyo Mountains BLM Land - Ridgecrest Office" on:contextmenu={e => e.preventDefault()}/>
        <p>Inyo Mountains BLM Land - Ridgecrest Office</p>
      </div>
      <div class="image-container">
        <img src={photo3} alt="Higher Rock Canyon BLM Land - Black Rock Office" on:contextmenu={e => e.preventDefault()}/>
        <p>Higher Rock Canyon BLM Land - Black Rock Office</p>
      </div>
    </div>

    
    <p>
      Public lands account for nearly 40% of the countries land area, protecting hundreds of thousands of unique ecosystems that not only provide clean water and air to our cities and communities, but an incredible array of natural wonders.
    </p>
    
    <div class="blog-image">
      <img src={photo1} alt="Mt. Baker Wilderness" on:contextmenu={e => e.preventDefault()}/>
      <p>Mt. Baker Wilderness, Mt. Baker - Snoqualmie National Forest</p>
    </div>


    <div class="side-image vertical">
      <img src={photo4} alt="Organ Pipe Cactus National Monument" on:contextmenu={e => e.preventDefault()}/>
      <p>Organ Pipe Cactus National Monument</p>
    </div>
    
    <p>
      It is no secret that public lands have been historically underfunded, and more recently put under endless scrutiny and attack, all in the name of political control and mindless profit by cutting staff and resources for land management agencies, pushing for the building of roads, mines, and drilling operations. This year, among many other things, there were severe cuts to staffing and funding to firefighters during peak fire season. Public lands are not well. 
    </p>
    
    <p>
      Nearly all of my photos in the US have been in public lands, they allow me and many others to reconnect with nature, and shows why these lands urgently need to be protected, for us, and for our future. Advocate for public lands! Advocate for the people, both in the US and overseas. 
    </p>
    
    <div style="clear: both;"></div>
    
    <div class="side-by-side-image">
      <div class="image-container">
        <img src={photo5} alt="Mt. Rainier National Park Old Growth Conifer Forest" on:contextmenu={e => e.preventDefault()}/>
        <p>Mt. Rainier National Park Old Growth Conifer Forest</p>
      </div>
      <div class="image-container">
        <img src={photo8} alt="San Luis National Wildlife Refuge Tule Elk" on:contextmenu={e => e.preventDefault()}/>
        <p>San Luis National Wildlife Refuge Tule Elk</p>
      </div>
    </div>
    
    <p style="text-align: center;">
      Go out, leave no trace, and enjoy what natural world we have across the US. 
    </p>
    <p style="text-align: center;">Public lands in public hands ❤️</p>
    
    <div class="blog-image">
      <img src={photo7} alt="Mt. Rainier National Park - Milky Way" on:contextmenu={e => e.preventDefault()}/>
      <p>Mt. Rainier National Park - Milky Way</p>
    </div>
    
  </div>
</section>

<Footer />

<style>
  @import '../../../lib/assets/styles/styles.css';

  section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  h1 {
    font-family: 'Georgia', serif;
    font-size: 2em;
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'Georgia', serif;
    font-size: 1.5em;
    margin-bottom: 15px;
    color: #2c5f41;
  }

  p {
    font-size: 1.2em;
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .content {
    flex: 1;
    padding-right: 20px;
    font-family: 'Georgia', serif;
  }

  .blog-image {
    max-width: 600px;
    margin: 20px auto;
  }

  .blog-image img {
    width: 100%;
    height: auto;
    aspect-ratio: 3/2;
    object-fit: cover;
  }
  
  .side-image {
    float: right;
    width: 45%;
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .side-image img {
    aspect-ratio: 3/2;
    object-fit: cover;
  }

  /* Vertical image styling */
  .side-image.vertical {
    width: 40%; /* Slightly narrower for vertical image */
  }

  .side-image.vertical img {
    aspect-ratio: 2/3; /* Vertical aspect ratio */
    object-fit: cover;
  }

  .side-by-side-image {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    margin: 20px 0;
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48%;
  }

  .side-by-side-image img {
    width: 100%;
    aspect-ratio: 3/2;
    object-fit: cover;
  }

  .side-by-side-image p {
    font-size: 0.7em;
    color: #555;
    text-align: center;
    margin-top: 10px;
  }

  .blog-image p {
    font-size: 0.7em;
    color: #555;
    text-align: center;
    margin-top: 10px;
  }

  .side-image p {
    font-size: 0.7em;
    color: #555;
    text-align: center;
    margin-top: 10px;
  }

  .call-to-action {
    background-color: #f8f9fa;
    padding: 20px;
    border-left: 4px solid #2c5f41;
    margin: 30px 0;
  }

  .call-to-action ul {
    margin: 0;
    padding-left: 20px;
  }

  .call-to-action li {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  img {
    display: block;
    width: 100%;
  }

  /* Responsive Styles for Mobile */
  @media (max-width: 768px) {
    section {
      flex-direction: column;
      padding: 20px;
    }

    .content {
      padding-right: 0;
    }

    .side-image {
      float: none;
      width: 100%;
      margin: 20px 0;
    }

    .side-image.vertical {
      width: 60%; /* Centered vertical image on mobile */
      margin: 20px auto;
    }

    .side-by-side-image {
      flex-direction: column;
      gap: 15px;
    }

    .image-container {
      width: 100%;
    }

    h1 {
      font-size: 1.8em;
      text-align: center;
    }

    h2 {
      font-size: 1.3em;
    }

    p {
      font-size: 1em;
      line-height: 1.6;
    }

    .call-to-action {
      margin: 20px 0;
      padding: 15px;
    }

    .call-to-action li {
      font-size: 1em;
    }
  }
</style>