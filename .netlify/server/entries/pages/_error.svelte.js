import { h as head, e as escape_html } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1j96wlh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(page.status)} · BIBLIOTHEEK</title>`);
      });
    });
    $$renderer2.push(`<section class="container error svelte-1j96wlh">`);
    if (page.status === 404) {
      $$renderer2.push(`<!--[0--><p class="eyebrow">Tidak ditemukan</p> <h1 class="svelte-1j96wlh">Halaman tidak ditemukan</h1> <p>Alamat <code class="svelte-1j96wlh">${escape_html(page.url.pathname)}</code> tidak tersedia atau belum dibuat.</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><p class="eyebrow">Kesalahan ${escape_html(page.status)}</p> <h1 class="svelte-1j96wlh">Terjadi kesalahan</h1> <p>${escape_html(page.error?.message)}</p>`);
    }
    $$renderer2.push(`<!--]--> <a class="btn btn--primary" href="/">Kembali ke Beranda</a></section>`);
  });
}
export {
  _error as default
};
