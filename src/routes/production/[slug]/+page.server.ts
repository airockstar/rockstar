import { PRIVATE_STRIPE_API_KEY } from "$env/static/private"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({
  params,
  url,
  locals: { safeGetSession, supabaseServiceRole },
}) => {
  const { session, user } = await safeGetSession()
  if (session) {
	    session.guest = !!user.subscribed;
   } else {
		session.guest = true;
	}
}
