
import { createClient } from '@supabase/supabase-js';
import { createMockDatabaseClient } from '@utils/MockDatabase';
import { Database } from '@utils/Database';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_MOCK } from '$env/static/public';

export const DB = new Database(PUBLIC_MOCK ? createMockDatabaseClient() : createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY));
