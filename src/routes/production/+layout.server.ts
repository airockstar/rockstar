import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({
  locals: { session },
  cookies,
}) => {
  // Session here is from authGuard hook
console.log("prouction layout.server.ts session=" + session);
//	const channels = getChannels(user);
	//const visiteds = getVistedChannelTimestamps(user);
	//return { data: { channels, user, visiteds }};
  return {
    session,
    cookies: cookies.getAll(),
  }
}
