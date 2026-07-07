import { a5 as ensure_array_like, a4 as attr, a6 as escape_html } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { B as Banner } from "../../../chunks/Banner.js";
import { c as getGalleryTiles, g as getSiteAssets } from "../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pageName = "Galleries";
    const galleries = getGalleryTiles();
    const { pageHeader: headerUrl } = getSiteAssets();
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    Banner($$renderer2, { pageName, headerUrl });
    $$renderer2.push(`<!----> <section class="gallery svelte-1logeyl"><!--[-->`);
    const each_array = ensure_array_like(galleries);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let gallery = each_array[$$index];
      $$renderer2.push(`<a${attr("href", `/galleries/${gallery.slug}`)} class="gallery-item svelte-1logeyl"><div class="gallery-image svelte-1logeyl"><img${attr("src", gallery.src)}${attr("alt", gallery.name)} class="svelte-1logeyl"/></div> <div class="gallery-info svelte-1logeyl"><h2 class="svelte-1logeyl">${escape_html(gallery.name)}</h2></div></a>`);
    }
    $$renderer2.push(`<!--]--></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
