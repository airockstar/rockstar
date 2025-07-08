import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL, } from "$env/static/public"
import { createBrowserClient, createServerClient, isBrowser, } from "@supabase/ssr"
import { redirect } from "@sveltejs/kit"
import { load_helper } from "$lib/load_helpers"
import { getLogger } from "@utils/logger"
const log = getLogger(import.meta.url);

export const load = async ({ fetch, data, depends, url }) => {
	log.enter("load", "isBrowser=" + isBrowser());
  depends("supabase:auth")

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  const { session, user } = await load_helper(data.session, supabase)
  if (!session || !user) {
    redirect(303, "/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", user.id)
    .single()

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

	log.exit("load", "user=" + user + ", session=" + session + ",profile=" + (profile ? profile.name : "null"));


  return {
    supabase,
    session,
    profile,
    user,
    amr: aal?.currentAuthenticationMethods,
  }
}

