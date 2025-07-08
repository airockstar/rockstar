import { PRIVATE_STRIPE_API_KEY } from "$env/static/private"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getChannels, getVistedChannelTimestamps, getProfile, getUserBundle } from "@store/Store"
import { supabase } from "$lib/supabaseClient"
import * as db from "@store/Store"
 import { getLogger } from "@utils/logger";
  const log = getLogger(import.meta.url);

export const load: PageServerLoad = async ({
  params,
  url,
  locals: { safeGetSession, supabaseServiceRole },
}) => {
console.log("ENTER [slug] page.server.ts");
	log.enter("PageServerLoad");
  const { session } = await safeGetSession()
	let user = supabase.auth.getUser();
	//const profile = db.getProfile(user);
	const data = await db.getUserBundle(user, { profile: "*", channels: "*", agents: "*", artifacts: "*", visiteds: "*" } );
//	//const channels = await db.getChannels(user);
	log.info("load", "channels=" + JSON.stringify(data.channels));
//	const channel = db.getChannel(params.slug);
//	const visiteds = await db.getVistedChannelTimestamps(user);
	const test = { test: "helpmespok" };
	data.user = user;
	data.test = test;
	return data;
/*
	let user = supabase.auth.getUser();
console.log("CALL getChannels [slug] page.server.ts");
	const profile = db.getProfile(user);
	const channels = db.getChannels(user);
//	const channel = db.getChannel(params.slug);
	const visiteds = db.getVistedChannelTimestamps(user);
	return { data: { channels, user, visiteds, profile }};
*/
}
