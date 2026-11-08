import { h as head, e as escape_html } from "../../../chunks/index.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, children } = $$props;
    head("1qg5d05", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<meta name="robots" content="noindex, nofollow"/>`);
    });
    $$renderer2.push(`<div class="bar svelte-1qg5d05"><div class="container inner svelte-1qg5d05"><p><strong>Admin</strong> · ${escape_html(data.email)}</p> <nav aria-label="Navigasi admin" class="svelte-1qg5d05"><a href="/admin" class="svelte-1qg5d05">Daftar buku</a> <a href="/" class="svelte-1qg5d05">Lihat situs</a> <form method="post" action="/logout"><button class="btn btn--ghost" type="submit">Keluar</button></form></nav></div></div> <div class="container content svelte-1qg5d05">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _layout as default
};
