import { isBrowser } from "@supabase/ssr"
import { createClient } from '@supabase/supabase-js';
import { MockSupabase } from '@utils/MockSupabase';
import { SupabaseDatabase } from '@utils/SupabaseDatabase';
import { SupabaseAuth } from '@utils/SupabaseAuth';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_MOCK } from '$env/static/public';

export const getDatabase = () => {
	if (PUBLIC_MOCK) {
		return new SupabaseDatabase(new MockSupabase());
	}
	if (isBrowser()) {
		return new SupabaseDatabase(createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY));
	} else {
		return new SupabaseDatabase(createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false
			}
		}));
	}
}
export const getAuth = () => {
	if (PUBLIC_MOCK) {
		return new SupabaseAuth(new MockSupabase());
	}
	if (isBrowser()) {
		return new SupabaseAuth(createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY));
	} else {
		return new SupabaseAuth(createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false
			}
		}));
	}
}
