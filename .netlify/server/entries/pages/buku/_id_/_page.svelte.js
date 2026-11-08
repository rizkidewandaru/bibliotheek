import { h as head, a as attr, s as stringify, e as escape_html, d as derived } from "../../../../chunks/index.js";
import { g as getCategory } from "../../../../chunks/categories.js";
import { a as drivePreviewUrl, b as driveViewUrl } from "../../../../chunks/drive.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const book = derived(() => data.book);
    head("k7b2nu", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(book().title)} · BIBLIOTHEEK</title>`);
      });
    });
    $$renderer2.push(`<article class="container wrap svelte-k7b2nu"><a${attr("href", `/katalog?kategori=${stringify(book().category)}`)}>← ${escape_html(getCategory(book().category).title)}</a> <h1 class="svelte-k7b2nu">${escape_html(book().title)}</h1> <p class="meta svelte-k7b2nu">${escape_html(book().author)} · ${escape_html(book().year)} · ${escape_html(book().publisher)} · ${escape_html(book().pages)} hlm.</p> <p>${escape_html(book().synopsis)}</p> <p class="copy svelte-k7b2nu">${escape_html(book().copyright)}</p> `);
    if (book().driveFileId) {
      $$renderer2.push(`<!--[0--><iframe${attr("title", `Pembaca PDF: ${book().title}`)}${attr("src", drivePreviewUrl(book().driveFileId))} allow="autoplay" class="svelte-k7b2nu"></iframe> <a class="btn btn--ghost"${attr("href", driveViewUrl(book().driveFileId))} target="_blank" rel="noopener noreferrer">Buka di Google Drive</a>`);
    } else {
      $$renderer2.push(`<!--[-1--><p>Berkas PDF belum tersedia.</p>`);
    }
    $$renderer2.push(`<!--]--></article>`);
  });
}
export {
  _page as default
};
