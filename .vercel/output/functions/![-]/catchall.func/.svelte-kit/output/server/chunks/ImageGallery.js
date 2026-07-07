import { a8 as attributes, a3 as stringify, a5 as ensure_array_like, a4 as attr, a1 as derived, a9 as attr_class } from "./index.js";
function Masonry($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      items,
      getKey,
      aspectRatio,
      heightEstimate,
      minColumnWidth = 160,
      columns: columnsProp,
      initialColumns,
      gap = 12,
      columnGap,
      rowGap,
      footerEstimate = 56,
      onlayout,
      empty,
      loading = false,
      skeleton,
      readingOrder = "columns",
      animate = false,
      animateDuration = 250,
      animateEasing = "cubic-bezier(.2, .8, .2, 1)",
      children,
      class: klass,
      style: userStyle,
      $$slots,
      $$events,
      ...rest
    } = $$props;
    let width = 0;
    const measured = derived(() => width > 0);
    const colGap = derived(() => columnGap ?? gap);
    const rowGap_ = derived(() => rowGap ?? gap);
    const columnCount = derived(() => {
      if (typeof columnsProp === "number") return Math.max(1, Math.floor(columnsProp));
      if (!measured() && initialColumns != null) return Math.max(1, Math.floor(initialColumns));
      if (columnsProp && typeof columnsProp === "object") {
        const bps = Object.keys(columnsProp).map(Number).filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
        if (bps.length === 0) return 1;
        let count = columnsProp[bps[0]] ?? 1;
        for (const bp of bps) if (width >= bp) count = columnsProp[bp];
        return Math.max(1, Math.floor(count));
      }
      return Math.max(1, Math.floor((width + colGap()) / (minColumnWidth + colGap())));
    });
    const columnWidth = derived(() => Math.max(0, columnCount() > 0 ? (width - colGap() * (columnCount() - 1)) / columnCount() : 0));
    const columns = derived(() => {
      const cols = Array.from({ length: columnCount() }, () => []);
      const heights = new Array(columnCount()).fill(0);
      for (const item of items) {
        let estimatedHeight;
        if (heightEstimate) {
          const h = heightEstimate(item, columnWidth());
          estimatedHeight = Number.isFinite(h) && h > 0 ? h : 0;
        } else {
          const ar = aspectRatio?.(item);
          const validAr = ar && ar > 0 ? ar : 1;
          estimatedHeight = columnWidth() / validAr + footerEstimate;
        }
        let shortest = 0;
        for (let i = 1; i < columnCount(); i++) {
          if (heights[i] < heights[shortest]) shortest = i;
        }
        cols[shortest].push(item);
        heights[shortest] += estimatedHeight;
      }
      return cols;
    });
    if (
      // While `animate` is off we don't track positions (off-path stays free), so the stored baseline
      // goes stale. When it flips back on, re-prime so the next layout is re-established silently instead
      // of catching up with one surprise animation. Declared before the FLIP effect so it runs first.
      /**
       * Manual FLIP. Built-in `animate:flip` can't help here because a tile moving between columns leaves
       * one keyed `{#each}` and enters another. After every repack we read each tile's new position
       * ("Last"), invert against its stored old position ("First"), and play a layout-free `transform` —
       * which can never resize or clip the tile, so the never-clip invariant holds. We only *play* on a
       * real reflow (column-count change or items changed), not on every resize pixel, but we always
       * refresh the stored rects so the next reflow inverts from a fresh baseline.
       */
      // establish dependency: re-run on every repack
      // Drop keys that no longer exist so the map can't grow unbounded.
      // After the first measured layout is stored, later reflows are real reflows worth animating.
      loading && skeleton
    ) {
      $$renderer2.push("<!--[0-->");
      skeleton($$renderer2);
      $$renderer2.push(`<!---->`);
    } else if (items.length === 0 && empty) {
      $$renderer2.push("<!--[1-->");
      empty($$renderer2);
      $$renderer2.push(`<!---->`);
    } else if (readingOrder === "source") {
      $$renderer2.push("<!--[2-->");
      $$renderer2.push(`<div${attributes(
        {
          ...rest,
          class: `masonry masonry-source ${stringify(klass ?? "")}`,
          style: `--masonry-col-gap: ${stringify(colGap())}px; --masonry-row-gap: ${stringify(rowGap_())}px; --masonry-columns: ${stringify(columnCount())}; ${stringify(userStyle ?? "")}`
        },
        "svelte-1l9llbj"
      )}><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<div class="masonry-item svelte-1l9llbj"${attr("data-key", String(getKey(item)))}>`);
        children($$renderer2, item);
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attributes(
        {
          ...rest,
          class: `masonry ${stringify(klass ?? "")}`,
          style: `--masonry-col-gap: ${stringify(colGap())}px; --masonry-row-gap: ${stringify(rowGap_())}px; ${stringify(userStyle ?? "")}`
        },
        "svelte-1l9llbj"
      )}><!--[-->`);
      const each_array_1 = ensure_array_like(columns());
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let column = each_array_1[i];
        $$renderer2.push(`<div class="masonry-column svelte-1l9llbj"><!--[-->`);
        const each_array_2 = ensure_array_like(column);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let item = each_array_2[$$index_1];
          $$renderer2.push(`<div class="masonry-item svelte-1l9llbj"${attr("data-key", String(getKey(item)))}>`);
          children($$renderer2, item);
          $$renderer2.push(`<!----></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ImageGallery($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { images = [], minColumnWidth = 400, gap = 16 } = $$props;
    let loaded = /* @__PURE__ */ new Set();
    const aspectOf = (item) => item.width && item.height ? item.width / item.height : 1;
    $$renderer2.push(`<section class="gallery svelte-geoysn">`);
    {
      let children = function($$renderer3, item) {
        $$renderer3.push(`<button class="gallery-item svelte-geoysn"${attr("aria-label", item.title || "Open image")}><img${attr("src", item.src)}${attr("alt", item.title || "Gallery")} loading="lazy"${attr_class("svelte-geoysn", void 0, { "loaded": loaded.has(item.src) })} onload="this.__e=event"/></button>`);
      };
      Masonry($$renderer2, {
        items: images,
        getKey: (item) => item.src,
        aspectRatio: aspectOf,
        minColumnWidth,
        gap,
        footerEstimate: 0,
        animate: true,
        children,
        $$slots: { default: true }
      });
    }
    $$renderer2.push(`<!----></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  ImageGallery as I
};
