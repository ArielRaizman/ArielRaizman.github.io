<script>
  import Header from '../../../lib/components/Header.svelte';
  import Footer from '../../../lib/components/Footer.svelte';
  import Banner from '../../../lib/components/Banner.svelte';
  import headerUrl from '../../../lib/assets/blogs/tide.jpg';
  // import mobileHeaderUrl from '../../lib/assets/galleries/gallery_header_mobile.jpg';
  import profileImage from '../../../lib/assets/about/profile.jpg';
  import sculpin from "../../../lib/assets/galleries/tide/PA200032.jpg";
  import shrimp from "../../../lib/assets/galleries/tide/PA190488.jpg";
  import spotted from "../../../lib/assets/galleries/tide/PA200090.jpg";
  import aeolid from "../../../lib/assets/blogs/aeolid.jpg";
  import opalescent from "../../../lib/assets/galleries/tide/sonyopalescent.jpg";
  import sandalwood from "../../../lib/assets/galleries/tide/PB170683.jpg";
  let pageName = "Tidepooling in California's Central Coast";
</script>
  
  <Header />
  <Banner {pageName} {headerUrl} />
  
  <section>
    <div class="content">
        <!-- <h1>Tidepooling in California's Central Coast</h1> -->
        <p>
            Hidden under the waves, revealing themselves for only moments at a time, tidepools give us a brief window into a world completely alien to the human experience. These miniature ecosystems are a microcosm of the life aquatic, where we can witness firsthand memories of life's origin. When the tide returns, these glimpses vanish under the foam, leaving only traces of wonder in our eyes.
        </p>
        <div class="blog-image">
            <img src={sculpin} alt="" on:contextmenu={e => e.preventDefault()}/>
            <p>A Fluffy Sculpin <i>(Oligocottus snyderi)</i> in a bed of algae. There is a leech <i>(Piscicolidae)</i> attached to its eye. This may seem creepy or unnerving, but it is a testiment to the amazing diversity of California's tidepools.</p>
        </div>
        <p>
            Just above the towering kelp forests in California’s central coast, these cold, rocky sanctuaries reveal some of the most diverse characters temperate marine life has to offer. Hundreds of tiny shrimp dart in and out of the red algae. Nudibranchs of all varieties glide along the seagrass, displaying resplendent warnings to unknowing predators of their toxic nature. 
        </p>
        <h1>Seeing the Unseen</h1>
        <div class="side-image">
            <img src={shrimp} alt="" on:contextmenu={e => e.preventDefault()}/>
            <p>A coastal shrimp (<i>Heptacarpus</i> sp.) hiding behind a cluster of red algae. It's body blending into both the foliage and sediment behind it.</p>
        </div>
        <p>
            At first glance, outside of the giant green anemones on top sprawling mats of red algae and mussels, these pools of life look seemingly empty. It’s only after your eyes adjust to each miniature scene that life reveals itself. The water is so clear, residents must find other ways to protect themselves from predators, equally eager for low tide as we are. Sculpins lay patiently at the bottom of the pool, perfectly camouflaged against anything that's nearby, while octopus squeeze into the smallest of cracks, leaving only a watchful eye following your movements, only visible when you lean in close. Tidepooling is a relaxing process. I take my time in each pool, taking in each rock and ledge, scanning for the bright colors of tiny nudibranchs, or the slight twitches and movements of crabs and fish. 
        </p>
        <div style="clear: both;"></div>
        <h1>A new world off each cliffside</h1>
        <p>
            Something interesting I’ve noticed in passing after going to different areas is that although you can find mostly the same species at each beach or location, the frequency of each species seems to change dramatically. This can be seen especially in nudibranch species, and is useful when looking for a variety of them. I would try to categorize them to different habitat preferences, and I am sure there is some sort of pattern, but even in the same microhabitat along two adjacent beaches seem to have noticeable variation. I think it's best to just visit a pool and find out-or take a peek at iNaturalist.       
        </p>
        <div class="side-by-side-image">
            <div class="image-container">
                <img src={spotted} alt="" on:contextmenu={e => e.preventDefault()}/>
                <p>A Spotted Dorid (<i>Triphoa maculata</i>) crawling on red algae on a rocky beach along highway 1 north of Santa Cruz.</p>
            </div>
            <div class="image-container">
                <img src={aeolid} alt="" on:contextmenu={e => e.preventDefault()}/>
                <p>A Hilton's Aeolid (<i>Phidiana hiltoni</i>) navigating under the surfgrass meadows at Pleasure Point</p>
            </div>
        </div>
        <h1>Photo Techniques</h1>
        <p>There are two ways I like to photograph wildlife in tide pools, using two different types of gear. Of course these are not the only ways to do so, but they’re methods I’ve found effective and enjoyable. I'm sharing them to inspire you to not only try these techniques but also to discover your own unique perspectives and methods for capturing these miniature underwater worlds. </p>
        <p>The first is using a macro lens and flash. By angling your camera, and hence your flash at just the right angle, so long as the water is smooth and flat, the light can pass through the water without reflecting back from the surface, giving a clear image of the life underneath. Many tidepool subjects are slow moving, or stay still when calm, providing you with many opportunities to compose your shot, and get the flash to pass through.         </p>
        <div class="blog-image">
            <img src={opalescent} alt="" on:contextmenu={e => e.preventDefault()}/>
            <p>An opalescent nudibranch (<i>Hermissenda opalescens</i>) along a sandy tide pool, shot from above with a flash and macro lens.</p>
        </div>
        <div class="side-image">
            <img src={sandalwood} alt="" on:contextmenu={e => e.preventDefault()}/>
            <p>A sandalwood dorid (<i>Acanthodoris lutea</i>) using the surface tension of the water to glide upside down just beneath the surface, giving it a "reverse reflection" from beneath the water.</p>
        </div>
        <p>The second is using an underwater camera. While professional housings work, compact point and shoots like my Olympus tg-5 are more convenient to reach into smaller tide pools (a phone would work as well). Shooting underwater allows you to achieve the coveted eye-level perspective cherished by wildlife photographers, creating intimate images from the subject’s viewpoint.This technique requires a lot more care-your movements must be deliberate and gentle, as any sudden movement may send your subject scurrying for cover. Although natural light can suffice, because many subjects will be on a macro level, a flash will make it much easier, and the water will diffuse the light. </p>
        <p><b>A critical  note on using flash:</b> While most intertidal wildlife aren’t disturbed by flash photography, always remain attentive to your subjects’ reactions.  If an animal looks visibly stressed and has no escape route, it's best to give it space. Octopus eyes are very similar to humans, so although they are much more sensitive than most intertidal creatures, it does not blind or permanently harm them. Treat them as if you are using a flash on a human subject. However, if an octopus is injured, disturbed by the light, or turns white (a sign of stress), cease photography and move away. Seahorses, although absent from California’s central coast, deserve special mention- current research suggests flash photography may potentially harm them. Never risk harming an animal for the sake of capturing an image.         </p>
        <p>You can view more of my tide pool photos <b class="link" on:click={() => window.location.href = `/galleries/low-tide`}>here</b>.</p>
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
      font-family: 'Arial', sans-serif;
      font-size: 2em;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  
    p {
      font-size: 1.2em;
      line-height: 1.8;
      margin-bottom: 20px;
    }
  
    .content {
      flex: 1;
      padding-right: 20px;
    }
    .blog-image {
      max-width: 600px;
      margin: 20px auto;
    }

    .blog-image img {
      width: 100%;
      height: auto;
    }
    
    .side-image {
    float: right;
    width: 45%; /* Adjust the width as needed */
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    }

    .side-by-side-image {
    display: flex;
    justify-content: space-between;
    gap: 20px; /* Adjust the gap between images as needed */
    width: 100%;
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48%; /* Adjust the width of each container as needed */
  }

  .side-by-side-image img {
    width: 100%; /* Adjust the width of each image as needed */
  }

  .side-by-side-image p {
    font-size: 0.7em; /* Adjust the font size as needed */
    color: #555;
    text-align: center; /* Center align the subtitles */
    margin-top: 10px; /* Add space between the image and subtitle */
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
    .profile-image {
      max-width: 400px;
      margin-left: 30px;
      margin-top: 50px;
    }
    .link:hover {
        text-decoration: underline;
        cursor: pointer;
        transition: opacity 0.3s ease;
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
  
      h1 {
        font-size: 2em;
        text-align: center;
      }
  
      p {
        font-size: 1em;
        line-height: 1.6;
      }
  
      .profile-image {
        max-width: 300px;
        margin: 20px auto;
      }
    }
  </style>