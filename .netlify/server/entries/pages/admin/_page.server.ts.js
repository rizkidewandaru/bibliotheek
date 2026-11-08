import { fail } from "@sveltejs/kit";
import { l as listBooks } from "../../../chunks/books.js";
import { r as requireAdmin } from "../../../chunks/auth.js";
const load = async ({ locals }) => ({
  books: await listBooks(locals.supabase)
});
const actions = {
  hapus: async ({ request, locals }) => {
    await requireAdmin(locals);
    const id = String((await request.formData()).get("id") ?? "");
    const { data, error } = await locals.supabase.from("buku").delete().eq("id", id).select("id");
    if (error || !data?.length) return fail(400, { message: "Buku tidak dapat dihapus." });
    return { success: true };
  }
};
export {
  actions,
  load
};
