import "clsx";
import { a as attr, b as attr_class, c as ensure_array_like, e as escape_html } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
import { I as Icon } from "../../chunks/Icon.js";
import { c as categoryHref, a as categories } from "../../chunks/categories.js";
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const links = [
      { href: "/", label: "Beranda" },
      { href: "/katalog", label: "Katalog Buku" },
      { href: "/tentang", label: "Tentang Museum" }
    ];
    let open = false;
    const isCurrent = (href) => href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href);
    $$renderer2.push(`<header class="site-header svelte-1elxaub"><div class="rule-band" aria-hidden="true"></div> <div class="container bar svelte-1elxaub"><a class="brand svelte-1elxaub" href="/"><span class="mark svelte-1elxaub" aria-hidden="true">B</span> <span class="brand-text svelte-1elxaub"><span class="name svelte-1elxaub">BIBLIOTHEEK</span> <span class="sub svelte-1elxaub">Digital Museum Library</span></span></a> <button class="toggle svelte-1elxaub" type="button"${attr(
      "aria-expanded",
      // Tutup menu seluler setiap kali berpindah halaman.
      open
    )} aria-controls="nav-utama">`);
    Icon($$renderer2, { name: "menu", size: 22 });
    $$renderer2.push(`<!----> <span>Menu</span></button> <nav id="nav-utama" aria-label="Navigasi utama"${attr_class("svelte-1elxaub", void 0, { "open": open })}><ul class="svelte-1elxaub"><!--[-->`);
    const each_array = ensure_array_like(links);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", link.href)}${attr("aria-current", isCurrent(link.href) ? "page" : void 0)} class="svelte-1elxaub">${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav></div></header>`);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="site-footer svelte-jz8lnl"><div class="rule-band" aria-hidden="true"></div> <div class="container grid svelte-jz8lnl"><div class="identity"><p class="name svelte-jz8lnl">BIBLIOTHEEK</p> <p class="sub svelte-jz8lnl">Digital Museum Library</p> <p class="about svelte-jz8lnl">Arsip digital dan media edukasi Museum Daerah Provinsi Nusa Tenggara Timur.</p> <p class="note svelte-jz8lnl">Situs dalam tahap pengembangan. Seluruh buku yang tampil saat ini adalah data contoh.</p></div> <nav aria-labelledby="footer-nav"><h2 id="footer-nav" class="svelte-jz8lnl">Navigasi</h2> <ul class="svelte-jz8lnl"><li><a href="/" class="svelte-jz8lnl">Beranda</a></li> <li><a href="/katalog" class="svelte-jz8lnl">Katalog Buku</a></li> <li><a href="/tentang" class="svelte-jz8lnl">Tentang Museum</a></li></ul></nav> <nav aria-labelledby="footer-kategori"><h2 id="footer-kategori" class="svelte-jz8lnl">Kategori</h2> <ul class="svelte-jz8lnl"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", categoryHref(category.slug))} class="svelte-jz8lnl">${escape_html(category.title)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav></div> <div class="container legal svelte-jz8lnl"><p>© ${escape_html(year)} Museum Daerah Provinsi Nusa Tenggara Timur. Seluruh hak cipta dilindungi.</p></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<div class="app svelte-12qhfyh"><a class="skip-link" href="#konten">Lewati ke konten utama</a> `);
  Header($$renderer);
  $$renderer.push(`<!----> <main id="konten" tabindex="-1" class="svelte-12qhfyh">`);
  children($$renderer);
  $$renderer.push(`<!----></main> `);
  Footer($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
