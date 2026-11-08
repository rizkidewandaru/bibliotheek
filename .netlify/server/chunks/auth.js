import { error } from "@sveltejs/kit";
async function requireAdmin(locals) {
  const user = await locals.getUser();
  if (!user) error(404, "Halaman tidak ditemukan");
  const { data } = await locals.supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) error(404, "Halaman tidak ditemukan");
  return user;
}
export {
  requireAdmin as r
};
