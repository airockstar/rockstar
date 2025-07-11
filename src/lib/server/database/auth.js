
/*
	server
	import { createClient } from '@supabase/supabase-js'
const supabase = createClient(supabase_url, anon_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})
// client
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(supabase_url, anon_key)
*/
const AUTHAPI = {
	signinWithEmailAndPassword: (email, password) => {
		const { data: { user }, error, } = await supabase.auth.signInWithPassword({ email, password });
	},
	signinWithMagicLink: (email) => {
		const { error } = await supabase .auth .signInWithOtp({ email });
	},
	signinWithOAuth: (provider) => {
		const { error } = await supabase.auth.signInWithOAuth({ provider });
	},
	signinWithPhoneOTP: (provider) => {
		const { data, error } = await supabase.auth.signInWithOtp({ phone });
	},
	verifySigninWithPhoneOTP: (phone, token) => {
		// After receiving a SMS with a OTP.
		const { data, error } = await supabase.auth.verifyOtp({ phone, token });
	},
	resetPasswordForEmail: (email) => {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email);
	}
	getLoggedInUserSession: () => {
		const { data: { session }, } = await supabase.auth.getSession();
	},
	getLoggedInUser: () => {
		const { data: { user }, } = await supabase.auth.getUser();
	},
}
