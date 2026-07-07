import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { B as Banner } from "../../../chunks/Banner.js";
import { g as getSiteAssets } from "../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { pageHeader: headerUrl } = getSiteAssets();
    let pageName = "Contact";
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    Banner($$renderer2, { pageName, headerUrl });
    $$renderer2.push(`<!----> <section class="svelte-1bv7ezn"><div class="content svelte-1bv7ezn"><p class="svelte-1bv7ezn">For any queries or feedback, feel free to reach out to me at <b class="hover-grow svelte-1bv7ezn">ariel.raizman@gmail.com</b> or through <a href="https://www.instagram.com/arl.takes.pics/" target="_blank" class="hover-grow svelte-1bv7ezn"><b>Instagram</b></a>.</p></div></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
