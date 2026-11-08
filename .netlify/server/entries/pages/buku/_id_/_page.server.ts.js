import { error } from "@sveltejs/kit";
import { g as getBook } from "../../../../chunks/books.js";
const load = async ({ params, locals }) => {
  const book = await getBook(locals.supabase, params.id);
  if (!book) error(404, "Buku tidak ditemukan");
  return { book };
};
export {
  load
};
