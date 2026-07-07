import { a4 as attr } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { B as Banner } from "../../../chunks/Banner.js";
import { g as getSiteAssets } from "../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { pageHeader: headerUrl, profile: profileImage } = getSiteAssets();
    let pageName = "About";
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    Banner($$renderer2, { pageName, headerUrl });
    $$renderer2.push(`<!----> <section class="svelte-cwls5q"><div class="content svelte-cwls5q"><h1 class="svelte-cwls5q">Ariel Raizman</h1> <p class="svelte-cwls5q">Welcome! I'm Ariel. I was born in Washington and go to school in Santa Cruz, and spend a lot of time between what is for now my two homes.</p> <p class="svelte-cwls5q">This site is a place for me to share my nature and wildlife photos in a more permanent and curated place in contrast to Instagram, and to have a place to share my thoughts on photography, the nature around me, and everything in between.</p> <p class="svelte-cwls5q">I hope you enjoy your stay!</p></div> <img class="profile-image svelte-cwls5q"${attr("src", profileImage)} alt="Ariel Raizman"/></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
