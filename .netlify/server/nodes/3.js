import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.DbyUhyMl.js","_app/immutable/chunks/d2ZBIAFl.js","_app/immutable/chunks/DKDJeSN7.js","_app/immutable/chunks/BjrTvFiv.js","_app/immutable/chunks/B8C0owfs.js","_app/immutable/chunks/9PORW9QW.js","_app/immutable/chunks/DKT5OLeC.js","_app/immutable/chunks/DWhM8pUq.js","_app/immutable/chunks/DOYq1Rc_.js","_app/immutable/chunks/BEKDA_33.js","_app/immutable/chunks/C3P8uEKX.js","_app/immutable/chunks/9pIcCkKj.js","_app/immutable/chunks/Bbw-vJ4T.js","_app/immutable/chunks/Bo5jNGwn.js","_app/immutable/chunks/DCnSPRzA.js","_app/immutable/chunks/DZosfWpI.js","_app/immutable/chunks/ssfbs2j0.js"];
export const stylesheets = ["_app/immutable/assets/BookCard.CBgG_mf2.css","_app/immutable/assets/3.CSfk5fwB.css"];
export const fonts = [];
