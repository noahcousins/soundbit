//@ts-nocheck

import type { Database } from '@/lib/database.types';
import { createBrowserClient } from '@supabase/ssr';
import { fetchCounts } from '@/utils/supabase/api/legacy/api';

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Statements main page
