import { fail, redirect, error } from "@sveltejs/kit";
import { g as getBook } from "../../../../../chunks/books.js";
import { r as requireAdmin } from "../../../../../chunks/auth.js";
import { r as readBookForm } from "../../../../../chunks/book-form.js";
const load = async ({ params, locals }) => {
  const book = await getBook(locals.supabase, params.id);
  if (!book) error(404, "Buku tidak ditemukan");
  return { book };
};
const actions = {
  default: async ({ request, params, locals }) => {
    await requireAdmin(locals);
    const { values, errors, row } = readBookForm(await request.formData());
    if (!row) return fail(400, { values, errors });
    const { data, error: error2 } = await locals.supabase.from("buku").update(row).eq("id", params.id).select("id");
    if (error2 || !data?.length)
      return fail(500, { values, errors: { form: "Perubahan tidak dapat disimpan." } });
    redirect(303, "/admin");
  }
};
export {
  actions,
  load
};
