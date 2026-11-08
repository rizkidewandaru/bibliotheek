import { l as listBooks } from "../../chunks/books.js";
const load = async () => {
  return { books: await listBooks() };
};
export {
  load
};
