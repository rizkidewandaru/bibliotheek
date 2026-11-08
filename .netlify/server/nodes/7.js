import * as server from '../entries/pages/adminbibli/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/adminbibli/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/adminbibli/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.CdYNSwKM.js","_app/immutable/chunks/d2ZBIAFl.js","_app/immutable/chunks/DKDJeSN7.js","_app/immutable/chunks/BjrTvFiv.js","_app/immutable/chunks/9PORW9QW.js","_app/immutable/chunks/DKT5OLeC.js"];
export const stylesheets = ["_app/immutable/assets/7.BBsgb8VR.css"];
export const fonts = [];
