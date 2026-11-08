import * as server from '../entries/pages/buku/_id_/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/buku/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/buku/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.n9GCCRda.js","_app/immutable/chunks/d2ZBIAFl.js","_app/immutable/chunks/DKDJeSN7.js","_app/immutable/chunks/BjrTvFiv.js","_app/immutable/chunks/9PORW9QW.js","_app/immutable/chunks/DKT5OLeC.js","_app/immutable/chunks/9pIcCkKj.js"];
export const stylesheets = ["_app/immutable/assets/8.ojGBF7-9.css"];
export const fonts = [];
