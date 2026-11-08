import { h as head } from "../../../../../chunks/index.js";
import { B as BookForm } from "../../../../../chunks/BookForm.js";
function _page($$renderer, $$props) {
  let { form } = $$props;
  head("c40c6p", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Tambah Buku · Admin BIBLIOTHEEK</title>`);
    });
  });
  $$renderer.push(`<h1 class="svelte-c40c6p">Tambah Buku</h1> `);
  BookForm($$renderer, { form, submitLabel: "Simpan Buku" });
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
