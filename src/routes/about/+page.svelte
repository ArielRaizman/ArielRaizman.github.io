<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import Banner from '../../lib/components/Banner.svelte';
  import headerUrl from '../../lib/assets/galleries/gallery_header.jpg';
  // import mobileHeaderUrl from '../../lib/assets/galleries/gallery_header_mobile.jpg';
  import profileImage from '../../lib/assets/about/profile.jpg';
  let pageName = "About";
</script>

<Header />
<Banner {pageName} {headerUrl} />

<section>
  <div class="content">
    <h1>Ariel Raizman</h1>
    <p>
      Hello! I'm Ariel Raizman, a wildlife and landscape photographer raised in western Washington. I've loved outdoors and little critters for as long as I remember. One of my earliest memories is going to my local pond and collecting 13 bullfrog tadpoles and raising them in a plastic tub until they grew legs in early winter, much to my parents' dismay.
    </p>
    <p>
      My parents took our family on many road trips and trips abroad as I grew up, allowing me to experience the incredible diversity on this planet from a young age, which I am forever grateful for. We still travel quite a bit, especially on the road with my dad.
    </p>
  </div>
  <img class="profile-image" src={profileImage} alt="Ariel Raizman" />
  <p>
    I go to school at UCSC, and within the dense redwoods and spanning chaparral on campus is where I really began finding my love for wildlife photography, and I haven't been able to stop since.
  </p>
</section>

<Footer />

<style>
  @import '../../lib/assets/styles/styles.css';

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
    font-size: 3em;
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

  .profile-image {
    max-width: 400px;
    margin-left: 20px;
    margin-top: 50px;
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