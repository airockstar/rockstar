import { PRIVATE_STRIPE_API_KEY } from "$env/static/private"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getChannels, getVistedChannelTimestamps } from "@store/Store"

export const load: PageServerLoad = async ({
  params,
  url,
  locals: { safeGetSession, supabaseServiceRole },
}) => {
console.log("ENTER [slug] page.server.ts");
  const { session, user } = await safeGetSession()
  if (session) {
	    session.guest = !!user.subscribed;
   } else {
		session.guest = true;
   }
	//const user = Store.getUser();
console.log("CALL getChannels [slug] page.server.ts");
	const channels = getChannels(user);
	const visiteds = getVistedChannelTimestamps(user);
	return { data: { channels, user, visiteds }};
}
