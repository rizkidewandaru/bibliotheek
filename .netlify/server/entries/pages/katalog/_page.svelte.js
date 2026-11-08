import { h as head, e as escape_html, a as attr, c as ensure_array_like, d as derived } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/index2.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import { a as categories } from "../../../chunks/categories.js";
import { p as parseScope, S as SearchBox, a as BookCard, f as filterBooks } from "../../../chunks/BookCard.js";
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let query = page.url.searchParams.get("q") ?? "";
    let scope = parseScope(page.url.searchParams.get("cari"));
    const slug = derived(() => page.url.searchParams.get("kategori"));
    const newest = derived(() => page.url.searchParams.get("urut") === "terbaru");
    const active = derived(() => categories.find((c) => c.slug === slug()));
    const books = derived(() => {
      const list = filterBooks(data.books.filter((b) => !active() || b.category === active().slug), query, scope);
      return newest() ? [...list].sort((a, b) => b.year - a.year) : list;
    });
    const hiddenFields = derived(() => ({
      ...active() ? { kategori: active().slug } : {},
      ...newest() ? { urut: "terbaru" } : {}
    }));
    function tabHref(categorySlug) {
      const params = new URLSearchParams();
      if (categorySlug) params.set("kategori", categorySlug);
      if (query.trim()) params.set("q", query.trim());
      if (query.trim() && scope !== "semua") params.set("cari", scope);
      if (newest()) params.set("urut", "terbaru");
      const qs = params.toString();
      return qs ? `/katalog?${qs}` : "/katalog";
    }
    function onsearch() {
      goto(tabHref(active()?.slug), {});
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1z0w5bc", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(active()?.title ?? "Katalog Buku")} · BIBLIOTHEEK</title>`);
        });
      });
      $$renderer3.push(`<p class="sr-only" role="status" aria-live="polite">${escape_html(books().length ? `${books().length} buku ditampilkan.` : "Tidak ada buku yang cocok.")}</p> <div class="container wrap svelte-1z0w5bc"><div class="top svelte-1z0w5bc"><h1 class="svelte-1z0w5bc">${escape_html(active()?.title ?? "Katalog Buku")}</h1> `);
      if (active()) {
        $$renderer3.push(`<!--[0--><p class="desc svelte-1z0w5bc">${escape_html(active().description)}</p>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      SearchBox($$renderer3, {
        onsearch,
        action: "/katalog",
        hidden: hiddenFields(),
        idPrefix: "katalog",
        get query() {
          return query;
        },
        set query($$value) {
          query = $$value;
          $$settled = false;
        },
        get scope() {
          return scope;
        },
        set scope($$value) {
          scope = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <nav aria-label="Filter kategori" class="tabs svelte-1z0w5bc"><a${attr("href", tabHref())}${attr("aria-current", !active() ? "page" : void 0)} class="svelte-1z0w5bc">Semua</a> <!--[-->`);
      const each_array = ensure_array_like(categories);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let c = each_array[$$index];
        $$renderer3.push(`<a${attr("href", tabHref(c.slug))}${attr("aria-current", active()?.slug === c.slug ? "page" : void 0)} class="svelte-1z0w5bc">${escape_html(c.title)}</a>`);
      }
      $$renderer3.push(`<!--]--></nav> <p class="count svelte-1z0w5bc">${escape_html(books().length)} buku${escape_html(query.trim() ? ` untuk “${query.trim()}”` : "")}</p> `);
      if (books().length) {
        $$renderer3.push(`<!--[0--><ul class="grid svelte-1z0w5bc"><!--[-->`);
        const each_array_1 = ensure_array_like(books());
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let book = each_array_1[$$index_1];
          $$renderer3.push(`<li>`);
          BookCard($$renderer3, { book });
          $$renderer3.push(`<!----></li>`);
        }
        $$renderer3.push(`<!--]--></ul>`);
      } else {
        $$renderer3.push(`<!--[-1--><div class="empty svelte-1z0w5bc"><h2>Buku tidak ditemukan</h2> <p class="svelte-1z0w5bc">Periksa ejaan, coba kata kunci yang lebih singkat, atau ubah pilihan “Cari pada” dan kategori.</p> <button class="btn btn--primary" type="button">Hapus pencarian</button></div>`);
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
