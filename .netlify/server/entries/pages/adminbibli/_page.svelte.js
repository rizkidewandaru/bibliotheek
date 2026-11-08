import { h as head, e as escape_html, a as attr } from "../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    head("1h52v24", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Masuk · BIBLIOTHEEK</title>`);
      });
      $$renderer3.push(`<meta name="robots" content="noindex, nofollow"/>`);
    });
    $$renderer2.push(`<section class="container wrap svelte-1h52v24"><h1 class="svelte-1h52v24">Masuk</h1> <p class="lead svelte-1h52v24">Halaman ini untuk petugas museum.</p> <form method="post" class="svelte-1h52v24">`);
    if (form?.message) {
      $$renderer2.push(`<!--[0--><p class="err svelte-1h52v24" role="alert">${escape_html(form.message)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <label for="email" class="svelte-1h52v24">Email</label> <input id="email" name="email" type="email" autocomplete="username" required=""${attr("value", form?.email ?? "")} class="svelte-1h52v24"/> <label for="password" class="svelte-1h52v24">Kata sandi</label> <input id="password" name="password" type="password" autocomplete="current-password" required="" class="svelte-1h52v24"/> <button class="btn btn--primary svelte-1h52v24" type="submit">Masuk</button></form></section>`);
  });
}
export {
  _page as default
};
