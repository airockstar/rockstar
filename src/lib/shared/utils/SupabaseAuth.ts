
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
export function SupabaseAuth(supabase) {

	this.signinWithEmailAndPassword = async (email, password) => {
		const { data: { user }, error, } = await supabase.auth.signInWithPassword({ email, password });
	}
	this.signinWithMagicLink = async (email) => {
		const { error } = await supabase .auth .signInWithOtp({ email });
	}
	this.signinWithOAuth = async (provider) => {
		const { error } = await supabase.auth.signInWithOAuth({ provider });
	}
	this.signinWithPhoneOTP = async (provider) => {
		const { data, error } = await supabase.auth.signInWithOtp({ phone });
	}
	this.verifySigninWithPhoneOTP = async (phone, token) => {
		// After receiving a SMS with a OTP.
		const { data, error } = await supabase.auth.verifyOtp({ phone, token });
	}
	this.resetPasswordForEmail = async (email) => {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email);
	}
	this.getSession = async () => {
		const { data: { session }, } = await supabase.auth.getSession();
	}
	this.getUser = async () => {
		const { data: { user }, } = await supabase.auth.getUser();
	}
}
