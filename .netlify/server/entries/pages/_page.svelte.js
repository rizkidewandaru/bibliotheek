import { e as escape_html, a as attr, d as derived, h as head, c as ensure_array_like } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
import "clsx";
import { c as categoryHref, g as getCategory, a as categories } from "../../chunks/categories.js";
import { B as BookCover, p as parseScope, S as SearchBox, a as BookCard, f as filterBooks } from "../../chunks/BookCard.js";
import { I as Icon } from "../../chunks/Icon.js";
async function tick() {
}
function SectionHeading($$renderer, $$props) {
  let { id, eyebrow, title, description, children } = $$props;
  $$renderer.push(`<div class="heading svelte-2penap"><div class="text svelte-2penap">`);
  if (eyebrow) {
    $$renderer.push(`<!--[0--><p class="eyebrow">${escape_html(eyebrow)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> <h2${attr("id", id)} class="svelte-2penap">${escape_html(title)}</h2> `);
  if (description) {
    $$renderer.push(`<!--[0--><p class="desc svelte-2penap">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div> `);
  if (children) {
    $$renderer.push(`<!--[0--><div class="action">`);
    children($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function CategoryCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { category, count } = $$props;
    $$renderer2.push(`<article class="card svelte-1rbk2wu"><span class="icon svelte-1rbk2wu">`);
    Icon($$renderer2, { name: category.icon, size: 30 });
    $$renderer2.push(`<!----></span> <h3 class="svelte-1rbk2wu">${escape_html(category.title)}</h3> <p class="desc svelte-1rbk2wu">${escape_html(category.description)}</p> <p class="count svelte-1rbk2wu">${escape_html(count)} publikasi contoh</p> <a class="link svelte-1rbk2wu"${attr("href", categoryHref(category.slug))}>Telusuri kategori<span class="sr-only">: ${escape_html(category.title)}</span> `);
    Icon($$renderer2, { name: "arrow", size: 18 });
    $$renderer2.push(`<!----></a></article>`);
  });
}
function PublicationItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { book } = $$props;
    const category = derived(() => getCategory(book.category));
    $$renderer2.push(`<li class="item svelte-17w2duh"><div class="thumb">`);
    BookCover($$renderer2, { book, decorative: true });
    $$renderer2.push(`<!----></div> <div class="info svelte-17w2duh"><p class="kicker svelte-17w2duh">${escape_html(category().title)} · ${escape_html(book.year)}</p> <h3 class="svelte-17w2duh"><a${attr("href", `/buku/${book.id}`)} class="svelte-17w2duh">${escape_html(book.title)}</a></h3> <p class="meta svelte-17w2duh">${escape_html(book.author)} · ${escape_html(book.publisher)} · ${escape_html(book.pages)} hlm.</p> `);
    if (book.isSample) {
      $$renderer2.push(`<!--[0--><p><span class="badge-sample">Data contoh</span></p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></li>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let query = page.url.searchParams.get("q") ?? "";
    let scope = parseScope(page.url.searchParams.get("cari"));
    const isSearching = derived(() => query.trim().length > 0);
    const results = derived(() => filterBooks(data.books, query, scope));
    const featured = derived(() => data.books.filter((b) => b.featured).slice(0, 4));
    const latest = derived(() => [...data.books].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, "id")).slice(0, 6));
    const heroCovers = derived(() => featured().slice(0, 3));
    const countByCategory = derived(() => Object.fromEntries(categories.map((c) => [
      c.slug,
      data.books.filter((b) => b.category === c.slug).length
    ])));
    const statusText = derived(() => !isSearching() ? "" : results().length ? `Ditemukan ${results().length} buku untuk "${query.trim()}".` : `Tidak ada buku yang cocok dengan "${query.trim()}".`);
    async function onsearch() {
      if (!isSearching()) return;
      await tick();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1uha8ag", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>BIBLIOTHEEK — Digital Museum Library | Museum Daerah Provinsi NTT</title>`);
        });
        $$renderer4.push(`<meta name="description" content="Perpustakaan digital dan arsip publikasi Museum Daerah Provinsi Nusa Tenggara Timur: katalog koleksi, katalog pameran, serta kajian dan penelitian koleksi."/>`);
      });
      $$renderer3.push(`<p class="sr-only" role="status" aria-live="polite">${escape_html(statusText())}</p> <section class="hero svelte-1uha8ag" aria-labelledby="hero-judul"><div class="container hero-grid svelte-1uha8ag"><div class="hero-copy svelte-1uha8ag"><p class="eyebrow">Museum Daerah Provinsi Nusa Tenggara Timur</p> <h1 id="hero-judul" class="svelte-1uha8ag">Bibliografi Publikasi Museum Nusa Tenggara Timur</h1> <p class="lead svelte-1uha8ag">BIBLIOTHEEK adalah perpustakaan digital dan arsip publikasi Museum Daerah Provinsi NTT:
				katalog koleksi, katalog pameran, serta kajian dan penelitian koleksi dalam satu tempat.</p> `);
      SearchBox($$renderer3, {
        onsearch,
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
      $$renderer3.push(`<!----></div> <div class="hero-art svelte-1uha8ag" aria-hidden="true"><div class="stack svelte-1uha8ag"><!--[-->`);
      const each_array = ensure_array_like(heroCovers());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let book = each_array[$$index];
        $$renderer3.push(`<div class="stack-item svelte-1uha8ag">`);
        BookCover($$renderer3, { book, decorative: true });
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--></div></div></div></section> <div class="container"><p class="notice svelte-1uha8ag" role="note"><strong>Data contoh.</strong> Semua buku, penulis, dan cover di halaman ini adalah data
		pengisi untuk pengembangan, bukan publikasi resmi Museum Daerah Provinsi NTT.</p></div> `);
      if (isSearching()) {
        $$renderer3.push(`<!--[0--><section id="hasil-pencarian" class="section svelte-1uha8ag" aria-labelledby="hasil-judul"><div class="container"><div class="results-head svelte-1uha8ag"><div><h2 id="hasil-judul" tabindex="-1" class="svelte-1uha8ag">Hasil pencarian</h2> <p class="status svelte-1uha8ag">`);
        if (results().length) {
          $$renderer3.push(`<!--[0-->Ditemukan ${escape_html(results().length)} buku untuk “${escape_html(query.trim())}”`);
        } else {
          $$renderer3.push(`<!--[-1-->Tidak ada buku ditemukan`);
        }
        $$renderer3.push(`<!--]--></p></div> <div class="results-actions svelte-1uha8ag"><a class="btn btn--ghost"${attr("href", `/katalog?q=${encodeURIComponent(query.trim())}`)}>Buka di katalog</a> <button class="btn btn--ghost" type="button">Hapus pencarian</button></div></div> `);
        if (results().length) {
          $$renderer3.push(`<!--[0--><ul class="book-grid svelte-1uha8ag"><!--[-->`);
          const each_array_1 = ensure_array_like(results());
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let book = each_array_1[$$index_1];
            $$renderer3.push(`<li>`);
            BookCard($$renderer3, { book });
            $$renderer3.push(`<!----></li>`);
          }
          $$renderer3.push(`<!--]--></ul>`);
        } else {
          $$renderer3.push(`<!--[-1--><div class="empty svelte-1uha8ag">`);
          Icon($$renderer3, { name: "search", size: 34 });
          $$renderer3.push(`<!----> <h3>Buku tidak ditemukan</h3> <p class="svelte-1uha8ag">Tidak ada judul atau penulis yang cocok dengan “${escape_html(query.trim())}”. Periksa ejaan, coba
						kata kunci yang lebih singkat, atau ubah pilihan “Cari pada”.</p> <div class="empty-actions svelte-1uha8ag"><button class="btn btn--primary" type="button">Hapus pencarian</button> <a class="btn btn--ghost" href="/katalog">Buka katalog</a></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></section>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <section id="kategori" class="section svelte-1uha8ag" aria-labelledby="kategori-judul"><div class="container">`);
      SectionHeading($$renderer3, {
        id: "kategori-judul",
        eyebrow: "Jelajahi",
        title: "Tiga Kategori Publikasi",
        description: "Telusuri arsip berdasarkan jenis publikasi yang diterbitkan dan dihimpun museum."
      });
      $$renderer3.push(`<!----> <ul class="category-grid svelte-1uha8ag"><!--[-->`);
      const each_array_2 = ensure_array_like(categories);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let category = each_array_2[$$index_2];
        $$renderer3.push(`<li>`);
        CategoryCard($$renderer3, { category, count: countByCategory()[category.slug] });
        $$renderer3.push(`<!----></li>`);
      }
      $$renderer3.push(`<!--]--></ul></div></section> <section id="unggulan" class="section section--tint svelte-1uha8ag" aria-labelledby="unggulan-judul"><div class="container">`);
      SectionHeading($$renderer3, {
        id: "unggulan-judul",
        eyebrow: "Pilihan",
        title: "Buku Unggulan",
        description: "Publikasi pilihan untuk memulai penelusuran.",
        children: ($$renderer4) => {
          $$renderer4.push(`<a class="btn btn--ghost" href="/katalog">Jelajahi Katalog</a>`);
        }
      });
      $$renderer3.push(`<!----> <ul class="book-grid svelte-1uha8ag"><!--[-->`);
      const each_array_3 = ensure_array_like(featured());
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let book = each_array_3[$$index_3];
        $$renderer3.push(`<li>`);
        BookCard($$renderer3, { book });
        $$renderer3.push(`<!----></li>`);
      }
      $$renderer3.push(`<!--]--></ul></div></section> <section id="terbaru" class="section svelte-1uha8ag" aria-labelledby="terbaru-judul"><div class="container">`);
      SectionHeading($$renderer3, {
        id: "terbaru-judul",
        eyebrow: "Terkini",
        title: "Publikasi Terbaru",
        description: "Terbitan terbaru yang ditambahkan ke arsip digital.",
        children: ($$renderer4) => {
          $$renderer4.push(`<a class="btn btn--primary" href="/katalog?urut=terbaru">Lihat Semua</a>`);
        }
      });
      $$renderer3.push(`<!----> <ul class="latest-list svelte-1uha8ag"><!--[-->`);
      const each_array_4 = ensure_array_like(latest());
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let book = each_array_4[$$index_4];
        PublicationItem($$renderer3, { book });
      }
      $$renderer3.push(`<!--]--></ul></div></section>`);
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
