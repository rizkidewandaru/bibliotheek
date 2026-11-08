import * as server from '../entries/pages/admin/buku/_id_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/buku/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/buku/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BcofCYWu.js","_app/immutable/chunks/d2ZBIAFl.js","_app/immutable/chunks/DKDJeSN7.js","_app/immutable/chunks/9PORW9QW.js","_app/immutable/chunks/DNhVLilU.js","_app/immutable/chunks/BjrTvFiv.js","_app/immutable/chunks/B8C0owfs.js","_app/immutable/chunks/DKT5OLeC.js","_app/immutable/chunks/Bo5jNGwn.js","_app/immutable/chunks/9pIcCkKj.js"];
export const stylesheets = ["_app/immutable/assets/BookForm.DSd6PVVY.css","_app/immutable/assets/6.CXYAUDME.css"];
export const fonts = [];
