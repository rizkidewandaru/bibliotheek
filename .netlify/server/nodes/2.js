import * as server from '../entries/pages/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.wHLRChXN.js","_app/immutable/chunks/d2ZBIAFl.js","_app/immutable/chunks/DKDJeSN7.js","_app/immutable/chunks/ssfbs2j0.js","_app/immutable/chunks/9PORW9QW.js"];
export const stylesheets = ["_app/immutable/assets/2.BgilrP6r.css"];
export const fonts = [];
