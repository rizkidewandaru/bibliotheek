import { a as attr } from "./index.js";
function Icon($$renderer, $$props) {
  let { name, size = 20, strokeWidth = 1.75 } = $$props;
  $$renderer.push(`<svg${attr("width", size)}${attr("height", size)} viewBox="0 0 24 24" fill="none" stroke="currentColor"${attr("stroke-width", strokeWidth)} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">`);
  if (name === "search") {
    $$renderer.push(`<!--[0--><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>`);
  } else if (name === "menu") {
    $$renderer.push(`<!--[1--><path d="M4 7h16M4 12h16M4 17h16"></path>`);
  } else if (name === "close") {
    $$renderer.push(`<!--[2--><path d="M6 6l12 12M18 6 6 18"></path>`);
  } else if (name === "arrow") {
    $$renderer.push(`<!--[3--><path d="M5 12h14M13 6l6 6-6 6"></path>`);
  } else if (name === "collection") {
    $$renderer.push(`<!--[4--><path d="M9 3h6M10 3v3M14 3v3"></path><path d="M10 6C7 7.5 6 10 6 13c0 4 2.5 8 6 8s6-4 6-8c0-3-1-5.5-4-7"></path><path d="M6.5 12h11"></path>`);
  } else if (name === "exhibition") {
    $$renderer.push(`<!--[5--><rect x="3" y="4" width="18" height="13" rx="1"></rect><path d="M8 21h8M12 17v4"></path><path d="m6 14 4-4 3 3 2-2 3 3"></path>`);
  } else if (name === "research") {
    $$renderer.push(`<!--[6--><path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z"></path><path d="M12 6v14"></path>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></svg>`);
}
export {
  Icon as I
};
