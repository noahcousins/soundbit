'use server';

import { createBrowserClient } from '@supabase/ssr';
import { Session } from '@supabase/supabase-js';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function isStatementLikedByUser(
  session: any,
  statementId: string
) {
  const { data, error } = await supabase
    .from('likes')
    .select('statement_id')
    .eq('user_id', session.user.id)
    .eq('statement_id', statementId);

  if (error) {
    console.error('Error checking if statement is liked by user:', error);
    return false;
  }

  return data.length > 0;
}
