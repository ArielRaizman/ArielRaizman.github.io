import { a4 as attr } from "../../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../../chunks/Footer.js";
import { B as Banner } from "../../../../chunks/Banner.js";
import { b as getPhotoSrc } from "../../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const headerUrl = getPhotoSrc("_DSC8955.jpg");
    const photo1 = getPhotoSrc("_DSC8955.jpg");
    const photo2 = getPhotoSrc("_DSC9948.jpg");
    const photo3 = getPhotoSrc("_DSC0498.jpg");
    const photo4 = getPhotoSrc("_DSC1926.jpg");
    const photo5 = getPhotoSrc("_DSC1857.jpg");
    getPhotoSrc("_DSC2598-Enhanced-NR.jpg");
    const photo7 = getPhotoSrc("_DSC1691-2.jpg");
    const photo8 = getPhotoSrc("_DSC8303-Enhanced-NR.jpg");
    let pageName = "Happy National Public Lands Day!";
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    Banner($$renderer2, { pageName, headerUrl });
    $$renderer2.push(`<!----> <section class="svelte-1i2y6jn"><div class="content svelte-1i2y6jn"><p class="svelte-1i2y6jn">Every year, on the fourth Saturday of September, the United States come together and celebrate our public lands, bringing thousands of volunteers to help restore and steward the US's natural landscape.</p> <div class="side-by-side-image svelte-1i2y6jn"><div class="image-container svelte-1i2y6jn"><img${attr("src", photo2)} alt="Inyo Mountains BLM Land - Ridgecrest Office" class="svelte-1i2y6jn"/> <p class="svelte-1i2y6jn">Inyo Mountains BLM Land - Ridgecrest Office</p></div> <div class="image-container svelte-1i2y6jn"><img${attr("src", photo3)} alt="Higher Rock Canyon BLM Land - Black Rock Office" class="svelte-1i2y6jn"/> <p class="svelte-1i2y6jn">Higher Rock Canyon BLM Land - Black Rock Office</p></div></div> <p class="svelte-1i2y6jn">Public lands account for nearly 40% of the countries land area, protecting hundreds of thousands of unique ecosystems that not only provide clean water and air to our cities and communities, but an incredible array of natural wonders.</p> <div class="blog-image svelte-1i2y6jn"><img${attr("src", photo1)} alt="Mt. Baker Wilderness" class="svelte-1i2y6jn"/> <p class="svelte-1i2y6jn">Mt. Baker Wilderness, Mt. Baker - Snoqualmie National Forest</p></div> <div class="side-image vertical svelte-1i2y6jn"><img${attr("src", photo4)} alt="Organ Pipe Cactus National Monument" class="svelte-1i2y6jn"/> <p class="svelte-1i2y6jn">Organ Pipe Cactus National Monument</p></div> <p class="svelte-1i2y6jn"><br class="svelte-1i2y6jn"/><br class="svelte-1i2y6jn"/> It is no secret that public lands have been historically underfunded, and more recently put under endless scrutiny and attack all in the name of political control and mindless profit by cutting staff and resources for land management agencies, pushing for the building of roads, mines, and drilling operations. This year, among many other things, there were severe cuts to staffing and funding to firefighters during peak fire season. Public lands are not well.</p> <p class="svelte-1i2y6jn">Nearly all of my photos in the US have been in public lands, they allow me and many others to reconnect with nature, and shows why these lands urgently need to be protected, for us, and for our future. Advocate for public lands, advocate for the people, both in the US and overseas.</p> <div style="clear: both;" class="svelte-1i2y6jn"></div> <div class="side-by-side-image svelte-1i2y6jn"><div class="image-container svelte-1i2y6jn"><img${attr("src", photo5)} alt="Mt. Rainier National Park Old Growth Conifer Forest" class="svelte-1i2y6jn"/> <p class="svelte-1i2y6jn">Mt. Rainier National Park Old Growth Conifer Forest</p></div> <div class="image-container svelte-1i2y6jn"><img${attr("src", photo8)} alt="San Luis National Wildlife Refuge Tule Elk" class="svelte-1i2y6jn"/> <p class="svelte-1i2y6jn">San Luis National Wildlife Refuge Tule Elk</p></div></div> <p style="text-align: center;" class="svelte-1i2y6jn">Go out, leave no trace, and enjoy what natural world we have across the US.</p> <p style="text-align: center;" class="svelte-1i2y6jn">Public lands in public hands.</p> <div class="blog-image svelte-1i2y6jn"><img${attr("src", photo7)} alt="Mt. Rainier National Park - Milky Way" class="svelte-1i2y6jn"/> <p class="svelte-1i2y6jn">Mt. Rainier National Park - Milky Way</p></div></div></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
