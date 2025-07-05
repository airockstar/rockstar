import { PRIVATE_STRIPE_API_KEY } from "$env/static/private"
import { error, redirect } from "@sveltejs/kit"
import {
  fetchSubscription,
  getOrCreateCustomerId,
} from "../../subscription_helpers.server"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({
  params,
  url,
  locals: { safeGetSession, supabaseServiceRole },
}) => {
  const { session, user } = await safeGetSession()
  if (session) {
	  const { error: idError, customerId } = await getOrCreateCustomerId({
	    supabaseServiceRole,
	    user,
	  })
	  if (idError || !customerId) {
	    console.error("Error getting customer id", idError)
	    error(500, {
	      message: "Unknown error. If issue persists, please contact us.",
	    })
	  }

	  const { primarySubscription } = await fetchSubscription({
	    customerId,
	  })
	  if (!primarySubscription) {
	    session.guest = true; 
	  }
   } else {
		session.guest = true;
	}

}
