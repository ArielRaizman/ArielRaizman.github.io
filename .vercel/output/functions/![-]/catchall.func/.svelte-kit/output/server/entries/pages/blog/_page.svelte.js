import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { B as Banner } from "../../../chunks/Banner.js";
import { g as getSiteAssets } from "../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { pageHeader: headerUrl } = getSiteAssets();
    let pageName = "Blog";
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    Banner($$renderer2, { pageName, headerUrl });
    $$renderer2.push(`<!----> <section class="svelte-u4k2t"><div class="svelte-u4k2t"><p class="link underline svelte-u4k2t">Tidepooling in California's Central Coast</p></div> <div class="svelte-u4k2t"><p class="link underline svelte-u4k2t">Happy National Public Lands Day!</p></div></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
