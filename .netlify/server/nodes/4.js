import * as server from '../entries/pages/admin/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.C5rE-nLK.js","_app/immutable/chunks/d2ZBIAFl.js","_app/immutable/chunks/DKDJeSN7.js","_app/immutable/chunks/BjrTvFiv.js","_app/immutable/chunks/B8C0owfs.js","_app/immutable/chunks/9PORW9QW.js","_app/immutable/chunks/DKT5OLeC.js","_app/immutable/chunks/9pIcCkKj.js"];
export const stylesheets = ["_app/immutable/assets/4.B1z3jUIH.css"];
export const fonts = [];
