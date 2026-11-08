import { l as listBooks } from "../../../chunks/books.js";
const load = async ({ locals }) => ({
  books: await listBooks(locals.supabase)
});
export {
  load
};
