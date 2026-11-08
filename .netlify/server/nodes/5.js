import * as server from '../entries/pages/admin/buku/baru/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/buku/baru/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/buku/baru/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.CB4hzY4R.js","_app/immutable/chunks/d2ZBIAFl.js","_app/immutable/chunks/DKDJeSN7.js","_app/immutable/chunks/9PORW9QW.js","_app/immutable/chunks/DNhVLilU.js","_app/immutable/chunks/BjrTvFiv.js","_app/immutable/chunks/B8C0owfs.js","_app/immutable/chunks/DKT5OLeC.js","_app/immutable/chunks/Bo5jNGwn.js","_app/immutable/chunks/9pIcCkKj.js"];
export const stylesheets = ["_app/immutable/assets/BookForm.DSd6PVVY.css","_app/immutable/assets/5.BFkdCbta.css"];
export const fonts = [];
