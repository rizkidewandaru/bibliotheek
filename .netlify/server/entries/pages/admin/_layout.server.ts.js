import { r as requireAdmin } from "../../../chunks/auth.js";
const load = async ({ locals }) => {
  const user = await requireAdmin(locals);
  return { email: user.email ?? "" };
};
export {
  load
};
