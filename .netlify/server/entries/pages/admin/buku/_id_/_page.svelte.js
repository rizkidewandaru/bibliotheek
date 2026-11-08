import { h as head } from "../../../../../chunks/index.js";
import { B as BookForm } from "../../../../../chunks/BookForm.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    head("17i9t8a", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Ubah Buku · Admin BIBLIOTHEEK</title>`);
      });
    });
    $$renderer2.push(`<h1 class="svelte-17i9t8a">Ubah Buku</h1> `);
    BookForm($$renderer2, { book: data.book, form, submitLabel: "Simpan Perubahan" });
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
