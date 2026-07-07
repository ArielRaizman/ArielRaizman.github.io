import { H as Header, F as Footer } from "../../chunks/Footer.js";
import { B as Banner } from "../../chunks/Banner.js";
import { g as getSiteAssets } from "../../chunks/data.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { pageHeader: headerUrl } = getSiteAssets();
    let pageName = "404 - Page Not Found";
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    Banner($$renderer2, { pageName, headerUrl });
    $$renderer2.push(`<!----> <section class="not-found svelte-1j96wlh"><p class="svelte-1j96wlh">Sorry, the page you are looking for does not exist.</p> <a href="/" class="svelte-1j96wlh">Go back to the homepage</a></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _error as default
};
