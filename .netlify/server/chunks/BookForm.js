import { e as escape_html, c as ensure_array_like, a as attr, s as stringify, d as derived } from "./index.js";
import { a as categories } from "./categories.js";
function BookForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { book, form, submitLabel } = $$props;
    const v = derived(() => form?.values ?? {
      judul: book?.title ?? "",
      penulis: book?.author ?? "",
      tahun_terbit: book ? String(book.year) : "",
      jumlah_halaman: book ? String(book.pages) : "",
      penerbit: book?.publisher ?? "",
      kategori: book?.category ?? "",
      sinopsis: book?.synopsis ?? "",
      hak_cipta: book?.copyright ?? "",
      drive: book?.driveFileId ?? "",
      cover_url: book?.cover ?? "",
      unggulan: book?.featured ?? false
    });
    const err = derived(() => form?.errors ?? {});
    const textFields = [
      { name: "judul", label: "Judul", type: "text" },
      { name: "penulis", label: "Penulis", type: "text" },
      { name: "tahun_terbit", label: "Tahun terbit", type: "number" },
      {
        name: "jumlah_halaman",
        label: "Jumlah halaman",
        type: "number"
      },
      { name: "penerbit", label: "Penerbit (opsional)", type: "text" }
    ];
    $$renderer2.push(`<form method="post" novalidate="" class="svelte-j1un8t">`);
    if (err().form) {
      $$renderer2.push(`<!--[0--><p class="err svelte-j1un8t" role="alert">${escape_html(err().form)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array = ensure_array_like(textFields);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let f = each_array[$$index];
      $$renderer2.push(`<div class="field svelte-j1un8t"><label${attr("for", f.name)} class="svelte-j1un8t">${escape_html(f.label)}</label> <input${attr("id", f.name)}${attr("name", f.name)}${attr("type", f.type)}${attr("value", v()[f.name])}${attr("aria-invalid", err()[f.name] ? "true" : void 0)}${attr("aria-describedby", err()[f.name] ? `e-${f.name}` : void 0)} class="svelte-j1un8t"/> `);
      if (err()[f.name]) {
        $$renderer2.push(`<!--[0--><p class="err-text svelte-j1un8t"${attr("id", `e-${stringify(f.name)}`)}>${escape_html(err()[f.name])}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="field svelte-j1un8t"><label for="kategori" class="svelte-j1un8t">Kategori</label> <select id="kategori" name="kategori"${attr("aria-invalid", err().kategori ? "true" : void 0)}${attr("aria-describedby", err().kategori ? "e-kategori" : void 0)} class="svelte-j1un8t">`);
    $$renderer2.option({ value: "", selected: !v().kategori }, ($$renderer3) => {
      $$renderer3.push(`— Pilih kategori —`);
    });
    $$renderer2.push(`<!--[-->`);
    const each_array_1 = ensure_array_like(categories);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let c = each_array_1[$$index_1];
      $$renderer2.option({ value: c.slug, selected: v().kategori === c.slug }, ($$renderer3) => {
        $$renderer3.push(`${escape_html(c.title)}`);
      });
    }
    $$renderer2.push(`<!--]--></select> `);
    if (err().kategori) {
      $$renderer2.push(`<!--[0--><p class="err-text svelte-j1un8t" id="e-kategori">${escape_html(err().kategori)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="field svelte-j1un8t"><label for="sinopsis" class="svelte-j1un8t">Sinopsis (opsional)</label> <textarea id="sinopsis" name="sinopsis" rows="5" class="svelte-j1un8t">`);
    const $$body = escape_html(v().sinopsis);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="field svelte-j1un8t"><label for="hak_cipta" class="svelte-j1un8t">Informasi hak cipta (opsional)</label> <textarea id="hak_cipta" name="hak_cipta" rows="3" class="svelte-j1un8t">`);
    const $$body_1 = escape_html(v().hak_cipta);
    if ($$body_1) {
      $$renderer2.push(`${$$body_1}`);
    }
    $$renderer2.push(`</textarea></div> <div class="field svelte-j1un8t"><label for="drive" class="svelte-j1un8t">Link Google Drive PDF (atau ID berkas)</label> <input id="drive" name="drive" type="text"${attr("value", v().drive)} placeholder="https://drive.google.com/file/d/.../view"${attr("aria-describedby", `h-drive${err().drive ? " e-drive" : ""}`)}${attr("aria-invalid", err().drive ? "true" : void 0)} class="svelte-j1un8t"/> <p class="hint svelte-j1un8t" id="h-drive">Berkas harus dibagikan sebagai “Siapa saja yang memiliki link”.</p> `);
    if (err().drive) {
      $$renderer2.push(`<!--[0--><p class="err-text svelte-j1un8t" id="e-drive">${escape_html(err().drive)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="field svelte-j1un8t"><label for="cover_url" class="svelte-j1un8t">URL gambar cover (opsional)</label> <input id="cover_url" name="cover_url" type="text"${attr("value", v().cover_url)} placeholder="https://..."${attr("aria-invalid", err().cover_url ? "true" : void 0)}${attr("aria-describedby", err().cover_url ? "e-cover_url" : void 0)} class="svelte-j1un8t"/> `);
    if (err().cover_url) {
      $$renderer2.push(`<!--[0--><p class="err-text svelte-j1un8t" id="e-cover_url">${escape_html(err().cover_url)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <label class="check svelte-j1un8t"><input type="checkbox" name="unggulan"${attr("checked", v().unggulan, true)} class="svelte-j1un8t"/> Tampilkan sebagai Buku Unggulan di beranda</label> <div class="buttons svelte-j1un8t"><button class="btn btn--primary" type="submit">${escape_html(submitLabel)}</button> <a class="btn btn--ghost" href="/admin">Batal</a></div></form>`);
  });
}
export {
  BookForm as B
};
