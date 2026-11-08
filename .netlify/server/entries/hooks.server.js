import { createServerClient } from "@supabase/ssr";
import { p as public_env } from "../chunks/shared-server.js";
const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    public_env.PUBLIC_SUPABASE_URL,
    public_env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: "/" });
          });
        }
      }
    }
  );
  event.locals.getUser = async () => {
    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    return error ? null : user;
  };
  return resolve(event, {
    filterSerializedResponseHeaders: (name) => name === "content-range" || name === "x-supabase-api-version"
  });
};
export {
  handle
};
