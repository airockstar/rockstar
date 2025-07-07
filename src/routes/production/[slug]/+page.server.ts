import { PRIVATE_STRIPE_API_KEY } from "$env/static/private"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getChannels } from "@store/Store"

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
	//const user = Store.getUser();
	const channels = getChannels(user);
	return { data: { channels, user }};
}
