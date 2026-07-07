import { aa as ssr_context, ab as fallback, a2 as attr_style, a9 as attr_class, a6 as escape_html, a7 as bind_props, a3 as stringify } from "./index.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Banner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let fontSize;
    let pageName = fallback($$props["pageName"], "Home");
    let headerUrl = fallback($$props["headerUrl"], "");
    let mobileHeaderUrl = fallback($$props["mobileHeaderUrl"], "");
    let isMobile = false;
    let currentHeaderUrl = headerUrl;
    function calculateFontSize(text, mobile) {
      if (mobile) {
        if (text.length <= 8) return "3rem";
        else if (text.length <= 15) return "2.5rem";
        else return "2rem";
      } else {
        if (text.length <= 10) return "4rem";
        else if (text.length <= 15) return "3rem";
        else return "3rem";
      }
    }
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        isMobile = window.matchMedia("(max-width: 768px)").matches;
        currentHeaderUrl = isMobile && mobileHeaderUrl ? mobileHeaderUrl : headerUrl;
      }
    };
    onDestroy(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateIsMobile);
      }
    });
    fontSize = calculateFontSize(pageName, isMobile);
    $$renderer2.push(`<section${attr_style(` background: url(${stringify(currentHeaderUrl)}) no-repeat center center/cover; position: relative; height: ${isMobile ? "40vh" : "45vh"}; background-color: rgba(0, 0, 0, 0.30); background-blend-mode: darken; `)} class="svelte-6wdrfy"><div${attr_class("overlay svelte-6wdrfy", void 0, { "mobile": isMobile })}><h1${attr_style(`font-size: ${stringify(fontSize)};`)} class="svelte-6wdrfy">${escape_html(pageName)}</h1></div></section>`);
    bind_props($$props, { pageName, headerUrl, mobileHeaderUrl });
  });
}
export {
  Banner as B
};
