import { a2 as attr_style, a3 as stringify } from "../../chunks/index.js";
import { H as Header, F as Footer } from "../../chunks/Footer.js";
import { I as ImageGallery } from "../../chunks/ImageGallery.js";
import { g as getSiteAssets, a as getBestPhotos } from "../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { heroDesktop } = getSiteAssets();
    const bestImages = getBestPhotos();
    let currentBgImage = heroDesktop;
    $$renderer2.push(`<main class="svelte-1uha8ag">`);
    Header($$renderer2);
    $$renderer2.push(`<!----> <section class="hero svelte-1uha8ag"${attr_style(`background-image: url(${stringify(currentBgImage)})`)}><div class="overlay svelte-1uha8ag"><h1 class="svelte-1uha8ag">Ariel Raizman</h1> <h2 class="svelte-1uha8ag">Nature Photography</h2></div></section> <section class="svelte-1uha8ag"><div class="content home-description svelte-1uha8ag"><p class="favorites-note svelte-1uha8ag">Explore some of my favorite photos below.</p></div></section> <section class="best-gallery svelte-1uha8ag">`);
    ImageGallery($$renderer2, { images: bestImages });
    $$renderer2.push(`<!----></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----></main>`);
  });
}
export {
  _page as default
};
