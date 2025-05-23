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
      Welcome! I'm Ariel. I was born in Washington and go to school in Santa Cruz, and spend a lot of time between what is for now my two homes.
    </p>
    <p>
      This site is a place for me to share my nature and wildlife photos in a more permanent and curated place in contrast to Instagram, and to have a place to share my thoughts on photography, the nature around me, and everything in between.
    </p>
    <p>
      I hope you enjoy your stay!
    </p>
  </div>
  <img class="profile-image" src={profileImage} alt="Ariel Raizman" />
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
    /* font-family: 'Arial', sans-serif; */
    font-size: 2em;
    margin-bottom: 20px;
    /* text-transform: uppercase; */
    font-family: 'Georgia', serif;
    /* letter-spacing: 2/x; */
  }

  p {
    font-size: 1.2em;
    line-height: 1.8;
    margin-bottom: 20px;
    font-family: 'Georgia', serif;
  }

  .content {
    flex: 1;
    padding-right: 20px;
  }

  .profile-image {
    max-width: 400px;
    margin: 30px;
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