import { a6 as escape_html, a4 as attr, a3 as stringify, a7 as bind_props } from "../../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../../chunks/Footer.js";
import { B as Banner } from "../../../../chunks/Banner.js";
import { I as ImageGallery } from "../../../../chunks/ImageGallery.js";
function Gallery($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let gallery = $$props["gallery"];
    $$renderer2.push(`<section class="description svelte-1oz3msq"><div class="svelte-1oz3msq"><p class="svelte-1oz3msq">${escape_html(gallery.quote)}</p> <h1 class="svelte-1oz3msq">${escape_html(gallery.quote_author)}</h1></div></section> `);
    ImageGallery($$renderer2, { images: gallery.photos });
    $$renderer2.push(`<!----> <div class="navigation-buttons svelte-1oz3msq"><a${attr("href", `/galleries/${stringify(gallery.prev)}`)} class="svelte-1oz3msq"><button class="svelte-1oz3msq">Previous</button></a> <a href="/galleries" class="svelte-1oz3msq"><button class="svelte-1oz3msq">Galleries</button></a> <a${attr("href", `/galleries/${stringify(gallery.next)}`)} class="svelte-1oz3msq"><button class="svelte-1oz3msq">Next</button></a></div>`);
    bind_props($$props, { gallery });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let gallery;
    let data = $$props["data"];
    gallery = data.gallery;
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    Banner($$renderer2, { pageName: gallery.name, headerUrl: gallery.banner });
    $$renderer2.push(`<!----> `);
    Gallery($$renderer2, { gallery });
    $$renderer2.push(`<!----> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
