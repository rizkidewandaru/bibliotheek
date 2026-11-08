import { a as attr, c as ensure_array_like, s as stringify, e as escape_html, f as bind_props, d as derived } from "./index.js";
import { I as Icon } from "./Icon.js";
import { g as getCategory } from "./categories.js";
const searchScopes = [
  { value: "semua", label: "Judul dan penulis" },
  { value: "judul", label: "Judul saja" },
  { value: "penulis", label: "Penulis saja" }
];
function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function parseScope(value) {
  return searchScopes.some((s) => s.value === value) ? value : "semua";
}
function filterBooks(books, query, scope) {
  const q = normalize(query);
  if (!q) return books;
  const terms = q.split(" ");
  return books.filter((book) => {
    const haystack = scope === "judul" ? normalize(book.title) : scope === "penulis" ? normalize(book.author) : normalize(`${book.title} ${book.author}`);
    return terms.every((term) => haystack.includes(term));
  });
}
function SearchBox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      query = "",
      scope = "semua",
      onsearch,
      idPrefix = "cari",
      action = "/",
      hidden = {}
    } = $$props;
    $$renderer2.push(`<form class="search svelte-1o0c7a1" role="search" method="get"${attr("action", action)}><!--[-->`);
    const each_array = ensure_array_like(Object.entries(hidden));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [name, value] = each_array[$$index];
      $$renderer2.push(`<input type="hidden"${attr("name", name)}${attr("value", value)} class="svelte-1o0c7a1"/>`);
    }
    $$renderer2.push(`<!--]--> <div class="field grow svelte-1o0c7a1"><label${attr("for", `${stringify(idPrefix)}-q`)} class="svelte-1o0c7a1">Cari buku berdasarkan judul atau penulis</label> <div class="input-wrap svelte-1o0c7a1">`);
    Icon($$renderer2, { name: "search", size: 20 });
    $$renderer2.push(`<!----> <input${attr("id", `${stringify(idPrefix)}-q`)} name="q" type="search"${attr("value", query)} placeholder="Contoh: tekstil, anyaman, Penulis Contoh A" autocomplete="off" class="svelte-1o0c7a1"/></div></div> <div class="field svelte-1o0c7a1"><label${attr("for", `${stringify(idPrefix)}-scope`)} class="svelte-1o0c7a1">Cari pada</label> `);
    $$renderer2.select(
      {
        id: `${stringify(idPrefix)}-scope`,
        name: "cari",
        value: scope,
        class: ""
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(searchScopes);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let option = each_array_1[$$index_1];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1o0c7a1"
    );
    $$renderer2.push(`</div> <button class="btn btn--primary submit" type="submit">`);
    Icon($$renderer2, { name: "search", size: 18 });
    $$renderer2.push(`<!----> Cari Buku</button></form>`);
    bind_props($$props, { query, scope });
  });
}
function BookCover($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { book, decorative = false } = $$props;
    const tones = {
      "katalog-koleksi": { bg: "#8B5E3C", fg: "#F3E8A4", accent: "#F2A900" },
      "katalog-pameran": { bg: "#F2A900", fg: "#242111", accent: "#8B5E3C" },
      "kajian-penelitian": { bg: "#F3E8A4", fg: "#242111", accent: "#8B5E3C" }
    };
    const tone = derived(() => tones[book.category]);
    const label = derived(() => getCategory(book.category).short);
    const seed = derived(() => [...book.id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0) >>> 0, 7));
    const cy = derived(() => 140 + seed() % 40);
    const steps = [0, 1, 2, 3];
    if (book.cover) {
      $$renderer2.push(`<!--[0--><img class="cover svelte-13ose1s"${attr("src", book.cover)}${attr("alt", decorative ? "" : `Cover buku ${book.title}`)} width="300" height="400" loading="lazy"/>`);
    } else {
      $$renderer2.push(`<!--[-1--><svg class="cover svelte-13ose1s" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"${attr("role", decorative ? void 0 : "img")}${attr("aria-label", decorative ? void 0 : `Cover contoh (pengganti) untuk buku ${book.title}`)}${attr("aria-hidden", decorative ? "true" : void 0)}><rect width="300" height="400"${attr("fill", tone().bg)}></rect><rect x="14" y="14" width="272" height="372" fill="none"${attr("stroke", tone().accent)} stroke-width="2"></rect><!--[-->`);
      const each_array = ensure_array_like(steps);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let i = each_array[$$index];
        const half = 22 + i * 22;
        $$renderer2.push(`<rect${attr("x", 150 - half)}${attr("y", cy() - half)}${attr("width", half * 2)}${attr("height", half * 2)} fill="none"${attr("stroke", tone().accent)} stroke-width="2"${attr("opacity", 1 - i * 0.15)}${attr("transform", `rotate(45 150 ${cy()})`)}></rect>`);
      }
      $$renderer2.push(`<!--]--><text x="150" y="338" text-anchor="middle" font-size="14" letter-spacing="3"${attr("fill", tone().fg)} class="svelte-13ose1s">${escape_html(label())}</text><text x="150" y="362" text-anchor="middle" font-size="11" letter-spacing="2"${attr("fill", tone().fg)} class="svelte-13ose1s">COVER CONTOH</text></svg>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function BookCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { book } = $$props;
    const category = derived(() => getCategory(book.category));
    $$renderer2.push(`<article class="card svelte-1nwymv9"><div class="cover-wrap svelte-1nwymv9">`);
    BookCover($$renderer2, { book });
    $$renderer2.push(`<!----></div> <div class="body svelte-1nwymv9"><p class="tag svelte-1nwymv9">${escape_html(category().title)}</p> <h3 class="title svelte-1nwymv9">${escape_html(book.title)}</h3> <p class="author svelte-1nwymv9">${escape_html(book.author)}</p> <p class="meta svelte-1nwymv9">Terbit ${escape_html(book.year)} · ${escape_html(book.pages)} hlm.</p> `);
    if (book.isSample) {
      $$renderer2.push(`<!--[0--><p class="svelte-1nwymv9"><span class="badge-sample">Data contoh</span></p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <a class="btn btn--primary svelte-1nwymv9"${attr("href", `/buku/${book.id}`)}>Lihat Buku<span class="sr-only">: ${escape_html(book.title)}</span> `);
    Icon($$renderer2, { name: "arrow", size: 18 });
    $$renderer2.push(`<!----></a></div></article>`);
  });
}
export {
  BookCover as B,
  SearchBox as S,
  BookCard as a,
  filterBooks as f,
  parseScope as p
};
