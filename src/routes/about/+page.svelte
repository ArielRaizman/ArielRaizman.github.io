<script>
  import Header from "../../lib/components/Header.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import Banner from "../../lib/components/Banner.svelte";
  import Carousel from "../../lib/components/Carousel.svelte";
  import { getSiteAssets } from "$lib/data.js";
  const {
    pageHeader: headerUrl,
    profile: profileImage,
    story1Photos,
    story2Photos,
    childPhoto,
  } = getSiteAssets();
  let pageName = "About";
</script>

<Header />
<Banner {pageName} {headerUrl} />

<section class="about-container">
  <div class="intro-block">
    <div class="content">
      <h1>Ariel Raizman</h1>
      <p>
        Hello! I'm Ariel Raizman. I grew up in the Puget Sound, and currently
        live in the Monterey Bay, where my research has fortunately taken me to
        some of the most biodiverse ecosystems on the planet.
      </p>
      <p>
        I'm a wildlife photographer, though sometimes I'm not sure thats the
        right term. Photography for me is an outlet to share the diversity of
        ecosystems. Life is shaped by their environment, and they shape the
        landscape right back. I still love detailed portraits of wildlife,
        showing the ridges on their skin and the details in their eyes, but
        pulling the camera back you start to notice the bigger picture, and
        thats where wonder and understanding begins.
      </p>
    </div>
    {#if profileImage}
      <img class="profile-image" src={profileImage} alt="Ariel Raizman" />
    {/if}
  </div>

  <div class="story-block">
    <p>
      A sea otter dives down to pry open a sea urchin, providing space for large
      canopies of kelp to blanket the shoreline, providing cover for juvenile
      rockfish. Winter storms rip the kelp stalks free of their holdfasts as
      they tumble and dry along the beach attracting beach hoppers and seaweed
      flies, providing food and camouflage for nesting plovers.
    </p>
    {#if story1Photos.length > 0}
      <Carousel images={story1Photos} />
    {/if}
  </div>

  <div class="story-block">
    <p>
      The massive orchid bee hauls itself above the rainforest canopy to reach
      flowers only they are large enough to pry open, breathing life into a
      Brazil nut pod that falls to the forest floor. It leaves a wooden vault so
      hard only an agouti can break it open to reap the rewards, while pacas and
      peccaries scavenge for leftovers leaving a scattering of empty husks that
      fill with rainwater, providing a cradle for the next generation of frogs
      and damselflies.
    </p>
    {#if story2Photos.length > 0}
      <Carousel images={story2Photos} />
    {/if}
  </div>

  <div class="story-block conclusion">
    <p>
      We feed on the rockfish that take refuge beneath the kelp canopy, the
      Brazil nuts the agoutis leave behind, and give and take from almost
      everything else that lives and breathes on this planet. When we can't
      describe the natural world, we lose the language to appreciate its
      diversity and understand our relationship in it. I hope my photos can give
      that language back. It's hard to conserve something we don't know enough
      about.
    </p>
    <p>
      The natural world is fluid, but this website needs a bit of structure so
      we can navigate them. These galleries are organized by broad locations and
      then split into distinct <b><a href="https://ecoregions.appspot.com/">ecoregions</a></b>. I hope you enjoy your stay :)
    </p>
    {#if childPhoto}
      <div class="child-photo-container">
        <img src={childPhoto.src} alt={childPhoto.title} class="child-photo" />
        {#if childPhoto.caption || childPhoto.title}
          <div class="caption">{childPhoto.caption || childPhoto.title}</div>
        {/if}
      </div>
    {/if}
  </div>
</section>

<Footer />

<style>
  @import "../../lib/assets/styles/styles.css";

  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .intro-block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .content {
    flex: 1;
    padding-right: 40px;
    min-width: 300px;
  }

  .story-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .story-block p {
    max-width: 900px;
    margin: 0 auto 30px auto;
  }

  .conclusion p {
    margin-bottom: 20px;
  }

  h1 {
    font-size: 2.5em;
    margin-bottom: 30px;
    font-family: "Georgia", serif;
    color: #222;
  }

  p {
    font-size: 1.25em;
    line-height: 1.8;
    margin-bottom: 20px;
    font-family: "Georgia", serif;
    color: #444;
  }

  .profile-image {
    max-width: 400px;
    width: 100%;
    margin: 30px 0;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .child-photo-container {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .child-photo {
    max-width: 550px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .caption {
    margin-top: 15px;
    font-size: 1.1em;
    font-family: "Georgia", serif;
    color: #555;
    text-align: center;
    max-width: 500px;
    line-height: 1.5;
  }

  /* Responsive Styles for Mobile */
  @media (max-width: 768px) {
    .about-container {
      padding: 40px 20px;
      gap: 40px;
    }

    .intro-block {
      flex-direction: column;
    }

    .content {
      padding-right: 0;
    }

    h1 {
      font-size: 2em;
      text-align: center;
    }

    p {
      font-size: 1.1em;
      line-height: 1.6;
    }

    .profile-image {
      max-width: 100%;
      margin: 20px auto;
    }
  }
</style>
