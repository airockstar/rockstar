import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { Enterprise } from "@bundles/Enterprise"
import { getLogger } from "@utils/logger";
import { getAuth } from "@utils/Services";
const log = getLogger(import.meta.url);

export const load: PageServerLoad = async ({
  params,
  url,
  locals: { safeGetSession, supabaseServiceRole },
}) => {
console.log("ENTER [slug] page.server.ts");
	log.enter("PageServerLoad");
  const { session } = await safeGetSession()
	let user = getAuth().getUser();
	//const profile = db.getProfile(user);
	const d = await new Enterprise().getBundle(user, { profile: { eq: { user_id: user.id } }, channel: {}, agent: {}, artifact: {}, visited: { eq: { user_id: user.id } } });
	log.info("loaddddddddddddd", "d=" + JSON.stringify(d));
	const data = { channels: d.channel, agents: d.agent, artifacts: d.artifact, profile: d.profile, visiteds: d.visited };
	log.info("loadddddddddddddddd", "channels=" + JSON.stringify(data.channels));
	log.info("loadddddddddddddddd", "agents=" + JSON.stringify(data.agents));
//	const channel = db.getChannel(params.slug);
	const test = { test: "helpmespock" };
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
