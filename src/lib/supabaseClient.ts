import { createClient } from '@supabase/supabase-js';
import { createMockDatabaseClient } from '@store/Mock';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_MOCK } from '$env/static/public';

export const supabase = PUBLIC_MOCK ? createMockDatabaseClient() : createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)


