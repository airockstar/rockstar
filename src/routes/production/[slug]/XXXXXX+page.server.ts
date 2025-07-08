import { PRIVATE_STRIPE_API_KEY } from "$env/static/private"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getChannels, getVistedChannelTimestamps, getProfile } from "@store/Store"
import { supabase } from "$lib/supabaseClient"
import * as db from "@store/Store"

export const load: PageServerLoad = async ({
  params,
  url,
  locals: { safeGetSession, supabaseServiceRole },
}) => {
console.log("ENTER [slug] page.server.ts");
  const { session } = await safeGetSession()
	let user = supabase.auth.getUser();
console.log("CALL getChannels [slug] page.server.ts");
	const profile = db.getProfile(user);
	const channels = db.getChannels(user);
//	const channel = db.getChannel(params.slug);
	const visiteds = db.getVistedChannelTimestamps(user);
	return { data: { channels, user, visiteds, profile }};
}
