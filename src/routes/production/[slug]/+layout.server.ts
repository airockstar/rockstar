import { PRIVATE_STRIPE_API_KEY } from "$env/static/private"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getChannels, getVistedChannelTimestamps, getProfile } from "@store/Store"
import { supabase } from "$lib/supabaseClient"
import * as db from "@store/Store"
import type { LayoutServerLoad } from './$types';
  import { getLogger } from "@utils/logger";
  const log = getLogger(import.meta.url);

export const load: LayoutServerLoad = async () => {
	let user = supabase.auth.getUser();
	const profile = db.getProfile(user);
	const channels = await db.getChannels(user);
	log.info("load", "channels=" + JSON.stringify(channels));
//	const channel = db.getChannel(params.slug);
	const visiteds = db.getVistedChannelTimestamps(user);
	const test = { test: "helpmespok" };
	return { channels, user, visiteds, profile, test };
}

