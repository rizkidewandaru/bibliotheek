import { fail, redirect } from "@sveltejs/kit";
import { r as requireAdmin } from "../../../../../chunks/auth.js";
import { r as readBookForm } from "../../../../../chunks/book-form.js";
const actions = {
  default: async ({ request, locals }) => {
    await requireAdmin(locals);
    const { values, errors, row } = readBookForm(await request.formData());
    if (!row) return fail(400, { values, errors });
    const { error } = await locals.supabase.from("buku").insert(row);
    if (error) return fail(500, { values, errors: { form: `Gagal menyimpan: ${error.message}` } });
    redirect(303, "/admin");
  }
};
export {
  actions
};
