import { h as head, e as escape_html, c as ensure_array_like, a as attr } from "../../../chunks/index.js";
import { g as getCategory } from "../../../chunks/categories.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    head("1jef3w8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Kelola Buku · Admin BIBLIOTHEEK</title>`);
      });
    });
    $$renderer2.push(`<div class="head svelte-1jef3w8"><h1 class="svelte-1jef3w8">Kelola Buku</h1> <a class="btn btn--primary" href="/admin/buku/baru">Tambah Buku</a></div> `);
    if (form?.message) {
      $$renderer2.push(`<!--[0--><p class="err svelte-1jef3w8" role="alert">${escape_html(form.message)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.books.length) {
      $$renderer2.push(`<!--[0--><div class="table-wrap svelte-1jef3w8"><table class="svelte-1jef3w8"><caption class="sr-only">Daftar buku</caption><thead class="svelte-1jef3w8"><tr><th scope="col" class="svelte-1jef3w8">Judul</th><th scope="col" class="svelte-1jef3w8">Penulis</th><th scope="col" class="svelte-1jef3w8">Kategori</th><th scope="col" class="svelte-1jef3w8">Tahun</th><th scope="col" class="svelte-1jef3w8">PDF</th><th scope="col" class="svelte-1jef3w8"><span class="sr-only">Aksi</span></th></tr></thead><tbody class="svelte-1jef3w8"><!--[-->`);
      const each_array = ensure_array_like(data.books);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let book = each_array[$$index];
        $$renderer2.push(`<tr><th scope="row" class="svelte-1jef3w8">${escape_html(book.title)}</th><td class="svelte-1jef3w8">${escape_html(book.author)}</td><td class="svelte-1jef3w8">${escape_html(getCategory(book.category).title)}</td><td class="svelte-1jef3w8">${escape_html(book.year)}</td><td class="svelte-1jef3w8">${escape_html(book.driveFileId ? "Ada" : "Belum")}</td><td class="actions svelte-1jef3w8"><a${attr("href", `/admin/buku/${book.id}`)}>Ubah<span class="sr-only">: ${escape_html(book.title)}</span></a> <form method="post" action="?/hapus" class="svelte-1jef3w8"><input type="hidden" name="id"${attr("value", book.id)}/> <button type="submit" class="svelte-1jef3w8">Hapus<span class="sr-only">: ${escape_html(book.title)}</span></button></form></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div>`);
    } else {
      $$renderer2.push(`<!--[-1--><p class="empty svelte-1jef3w8">Belum ada buku. Klik “Tambah Buku” untuk memulai.</p>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
