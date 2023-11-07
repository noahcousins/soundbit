//@ts-nocheck

import type { Database } from '@/lib/database.types';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

// Politicians grid page

export async function fetchCounts(politicianId: string) {
  let { data: legislationData, error: legislationError } = await supabase
    .from('legislations')
    .select('*', { count: 'exact' })
    .contains('politicianTags', [politicianId]);

  let { data: statementData, error: statementError } = await supabase
    .from('statements')
    .select('*', { count: 'exact' })
    .eq('politicianId', politicianId);

  return {
    legislationCount: legislationData ? legislationData.length : 0,
    statementCount: statementData ? statementData.length : 0
  };
}

export async function fetchPoliticiansAndCounts() {
  const politiciansData = await supabase.from('politicians').select('*');
  const politiciansWithCounts = await Promise.all(
    politiciansData.data!.map(async (politician) => {
      const counts = await fetchCounts(politician.id);
      return { ...politician, ...counts };
    })
  );

  return politiciansWithCounts;
}

export async function fetchPoliticianDetails(handle: string) {
  const { data: politicians, error: politiciansError } = await supabase
    .from('politicians')
    .select('*')
    .eq('handle', handle);

  if (politiciansError) {
    console.log('Error: ', politiciansError);
    return null;
  }

  return politicians[0];
}

export async function fetchStatementPolitician(politicianId: string) {
  const { data: politicians, error: politiciansError } = await supabase
    .from('politicians')
    .select('*')
    .eq('id', politicianId);

  if (politiciansError) {
    console.log('Error: ', politiciansError);
    return null;
  }

  return politicians[0];
}

type SessionUser = {
  user: {
    id: string; // Assuming the 'id' property is of type string, you should use the actual type if it's different
    // Other properties of the 'user' object if any
  };
  // Other properties of the 'sessionUser' object if any
};

export async function fetchUserData(sessionUser: SessionUser) {
  let { data: userData, error: userDataError } = await supabase
    .from('user')
    .select('*')
    .eq('id', sessionUser?.user?.id);
  return userData;
}

export async function fetchSimilarPoliticians(politicianId: string) {
  const { data: similarPoliticiansData, error: similarPoliticiansError } =
    await supabase
      .from('politicians')
      .select('*')
      .limit(8)
      .neq('id', politicianId);

  if (similarPoliticiansError) {
    console.log('Error: ', similarPoliticiansError);
    return [];
  }

  return similarPoliticiansData;
}

export async function fetchStatements() {
  let { data: statementsData, error: statementError } = await supabase
    .from('statements')
    .select('*');
  return {
    statementsData
  };
}

export async function fetchAllPoliticians() {
  let { data: politiciansData, error: statementError } = await supabase
    .from('politicians')
    .select('*');
  return {
    politiciansData
  };
}

export async function fetchTemplates() {
  let { data: templatesData, error: statementError } = await supabase
    .from('templates')
    .select('*');
  return {
    templatesData
  };
}

export async function fetchLegislations() {
  let { data: legislationsData, error: legislationsError } = await supabase
    .from('legislations')
    .select('*');
  return {
    legislationsData
  };
}

export async function fetchPoliticianStatements(politicianId: string) {
  const { data: statementsData, error: statementsError } = await supabase
    .from('statements')
    .select('*')
    .limit(8)
    .eq('politicianId', politicianId)
    .order('date', { ascending: false });

  if (statementsError) {
    console.log('Error fetching statements: ', statementsError);
    return [];
  }

  return statementsData;
}

export async function fetchPoliticianLegislations(politicianId: string) {
  const { data: legislationsData, error: legislationsError } = await supabase
    .from('legislations')
    .select('*')
    .limit(6)
    .contains('politicianTags', [politicianId])
    .order('date', { ascending: false });

  if (legislationsError) {
    console.log('Error fetching legislations: ', legislationsError);
    return [];
  }

  return legislationsData;
}

export async function fetchPoliticianEvents(politicianId: string) {
  const { data: eventsData, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .contains('politicianTags', [politicianId])
    .limit(3);

  if (eventsError) {
    console.log('Error fetching events: ', eventsError);
    return [];
  }

  return eventsData;
}

export async function fetchPoliticianById(politicianId: string) {
  const { data: politicianData, error: politicianError } = await supabase
    .from('politicians')
    .select('*')
    .eq('id', politicianId)
    .single();

  if (politicianError) {
    console.error('Error fetching politician', politicianError);
    return null;
  }

  return politicianData;
}

export async function fetchLegislationsWithPoliticians() {
  const { data: legislationData, error: legislationError } = await supabase
    .from('legislations')
    .select('*');

  if (legislationError) {
    console.error('Error fetching legislations', legislationError);
    return [];
  }

  const legislationsWithPoliticians = await Promise.all(
    legislationData.map(async (legislation) => {
      const politicianPromises = legislation.politicianTags!.map((tag) =>
        fetchPoliticianById(tag)
      );

      const politicians = await Promise.all(politicianPromises);

      return {
        ...legislation,
        politicians
      };
    })
  );

  return legislationsWithPoliticians;
}

export async function fetchEventsWithPoliticians() {
  const { data: eventsData, error: eventError } = await supabase
    .from('events')
    .select('*');

  if (eventError) {
    console.error('Error fetching events', eventError);
    return [];
  }

  const eventsWithPoliticians = await Promise.all(
    eventsData.map(async (event) => {
      const politicianPromises = event.politicianTags!.map((tag) =>
        fetchPoliticianById(tag)
      );

      const politicians = await Promise.all(politicianPromises);

      return {
        ...event,
        politicians
      };
    })
  );

  return eventsWithPoliticians;
}

export async function fetchPoliticiansByIds(ids) {
  const { data: politiciansData, error: politiciansError } = await supabase
    .from('politicians')
    .select('*')
    .in('id', ids);

  if (politiciansError) {
    console.error('Error fetching politicians', politiciansError);
    return [];
  }

  return politiciansData;
}

export async function fetchEvents() {
  const { data: eventsData, error: eventsError } = await supabase
    .from('events')
    .select('*');

  if (eventsError) {
    console.log('Error fetching events: ', eventsError);
    return [];
  }

  return eventsData;
}

export async function fetchEvent(handle) {
  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('handle', handle)
    .single();

  if (eventError) {
    console.error('Error fetching event: ', eventError);
    return null;
  }
  return eventData;
}

export async function fetchPoliticians(politicianTags) {
  const politicianPromises = politicianTags.map((tag) =>
    supabase.from('politicians').select('*').eq('id', tag).single()
  );

  try {
    const politicianResults = await Promise.all(politicianPromises);
    return politicianResults.map((result) => result.data);
  } catch (error) {
    console.error('Error fetching politician data: ', error);
    return [];
  }
}

export async function fetchOtherEvents(handle) {
  const { data: otherEventsData, error: otherEventsError } = await supabase
    .from('events')
    .select('*')
    .limit(3)
    .neq('handle', handle);

  if (otherEventsError) {
    console.error('Error fetching other events: ', otherEventsError);
    return [];
  }
  return otherEventsData;
}

export async function fetchLegislation(handle) {
  const { data, error } = await supabase
    .from('legislations')
    .select('*')
    .eq('handle', handle)
    .single();

  if (error) {
    console.error('Error fetching legislation: ', error);
    return null;
  }
  return data;
}

export async function fetchOtherLegislations(handle) {
  const { data: otherLegislationsData, error: otherLegislationsError } =
    await supabase
      .from('legislations')
      .select('*')
      .limit(8)
      .neq('handle', handle);

  if (otherLegislationsError) {
    console.error(
      'Error fetching other legislations: ',
      otherLegislationsError
    );
  }
  return otherLegislationsData;
}

// Fetch a single statement based on handle
export async function fetchStatement(handle) {
  try {
    const { data, error } = await supabase
      .from('statements')
      .select('*')
      .eq('handle', handle)
      .single();

    if (error) {
      console.error('Error fetching statement: ', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching statement: ', error);
    return null;
  }
}

// Fetch other statements by the same politician
export async function fetchOtherStatements(politicianId) {
  try {
    const { data, error } = await supabase
      .from('statements')
      .select('*')
      .eq('politicianId', politicianId)
      .limit(4);

    if (error) {
      console.error('Error fetching other statements: ', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching other statements: ', error);
    return [];
  }
}

//Auth

export async function signUpUser(email, password) {
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`
    }
  });
}

export async function signInUser(email, password) {
  await supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function signOutUser() {
  await supabase.auth.signOut();
}

//Search

export async function fetchSearchResults(searchQuery) {
  const { data, error } = await supabase
    .from('politicians')
    .select()
    .textSearch('name', searchQuery, {
      type: 'websearch',
      config: 'english'
    });

  if (error) {
    console.error('Error fetching search results:', error);
    return [];
  }

  return data;
}

// Like button

// Add these functions to your API.js

export async function addLike(statementId, session) {
  if (!session) return; // User not authenticated
  const { data, error } = await supabase.from('likes').upsert([
    {
      user_id: session.user.id,
      statement_id: statementId
    }
  ]);
  if (error) {
    console.error('Error adding like:', error);
    return null;
  }
  return data;
}

export async function addSend(templateId, session, politician) {
  if (!session) return; // User not authenticated
  const { data, error } = await supabase.from('sends').upsert([
    {
      user_id: session.user.id,
      template_id: templateId,
      politician_id: politician.id,
      premium: true
    }
  ]);
  if (error) {
    console.error('Error adding send:', error);
    return null;
  }
  return data;
}

export async function removeLike(statementId, session) {
  if (!session) return; // User not authenticated
  const { data, error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', session.user.id)
    .eq('statement_id', statementId);
  if (error) {
    console.error('Error removing like:', error);
    return null;
  }
  return data;
}

export async function checkLiked({ statementId, session }) {
  if (!session) return false; // User not authenticated
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('statement_id', statementId);
  if (error) {
    console.error('Error checking like status:', error);
    return false;
  }
  return data.length > 0;
}

// Vote button

// Add these functions to your API.js

export async function addVote({ legislationId, session, isUpvote }) {
  if (!session) return; // User not authenticated
  const { data, error } = await supabase.from('votes').upsert([
    {
      user_id: session.user.id,
      legislation_id: legislationId,
      is_upvote: isUpvote
    }
  ]);
  if (error) {
    console.error('Error adding vote:', error);
    return null;
  }
  return data;
}

export async function updateVote({ legislationId, session, isUpvote }) {
  if (!session) return; // User not authenticated

  // Check if a vote record already exists for the user and legislation
  const { data: existingVote, error } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('legislation_id', legislationId);

  if (error) {
    console.error('Error checking existing vote:', error);
    return null;
  }

  if (existingVote.length > 0) {
    // If a record exists, update its is_upvote field
    const voteId = existingVote[0].id;
    const { data: updatedData, error: updateError } = await supabase
      .from('votes')
      .upsert([
        {
          id: voteId,
          user_id: session.user.id,
          legislation_id: legislationId,
          is_upvote: isUpvote
        }
      ]);

    if (updateError) {
      console.error('Error updating vote:', updateError);
      return null;
    }

    return updatedData;
  } else {
    // If no record exists, insert a new vote record
    const { data: newData, error: insertError } = await supabase
      .from('votes')
      .upsert([
        {
          user_id: session.user.id,
          legislation_id: legislationId,
          is_upvote: isUpvote
        }
      ]);

    if (insertError) {
      console.error('Error adding vote:', insertError);
      return null;
    }

    return newData;
  }
}

export async function removeVote({ legislationId, session }) {
  if (!session) return; // User not authenticated
  const { data, error } = await supabase
    .from('votes')
    .delete()
    .eq('user_id', session.user.id)
    .eq('legislation_id', legislationId);
  if (error) {
    console.error('Error removing vote:', error);
    return null;
  }
  return data;
}

export async function checkVoted({ legislationId, session }) {
  if (!session) return null; // User not authenticated
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('legislation_id', legislationId);
  if (error) {
    console.error('Error checking vote status:', error);
    return null;
  }
  if (data.length > 0) {
    return data[0].is_upvote;
  }
  return null;
}

// Profile page

// Fetch user's liked statements
export async function fetchUserLikes(userId) {
  const { data, error } = await supabase
    .from('likes')
    .select('statement_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user likes:', error);
    return [];
  }

  return data;
}

// Fetch user's voted legislations
export async function fetchUserVotes({ session }) {
  const { data, error } = await supabase
    .from('votes')
    .select('legislation_id')
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error fetching user votes:', error);
    return [];
  }

  return data;
}

// Fetch legislations based on legislation IDs from user votes
export async function fetchLegislationsByLegislationIds(legislationIds) {
  const { data, error } = await supabase
    .from('legislations')
    .select('*')
    .in('id', legislationIds);

  if (error) {
    console.error('Error fetching legislations:', error);
    return [];
  }

  return data;
}

// Fetch statements based on statement IDs from user likes
export async function fetchStatementsByStatementIds(statementIds) {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .in('id', statementIds);

  if (error) {
    console.error('Error fetching statements:', error);
    return [];
  }

  return data;
}

export async function fetchStatementsWithPoliticians() {
  try {
    const { data: statementsData, error: statementError } = await supabase
      .from('statements')
      .select('*');

    if (statementError) {
      console.error('Error fetching statements: ', statementError);
      return [];
    }

    const statementsWithPoliticians = await Promise.all(
      statementsData.map(async (statement) => {
        const politician = await fetchPoliticianById(statement.politicianId);
        return {
          ...statement,
          politician
        };
      })
    );

    return statementsWithPoliticians;
  } catch (error) {
    console.error('Error fetching statements with politicians: ', error);
    return [];
  }
}

export async function fetchSlideById(slide_id) {
  const { data: slideData, error: slideError } = await supabase
    .from('slides')
    .select('*')
    .eq('id', slide_id)
    .single();

  if (slideError) {
    console.error('Error fetching slide', slideError);
    return null;
  }

  return slideData;
}

export async function fetchSlidesById(ids) {
  const { data: slidesData, error: slidesError } = await supabase
    .from('slides')
    .select('*')
    .in('id', ids);

  if (slidesError) {
    console.error('Error fetching slides', slidesError);
    return [];
  }

  return slidesData;
}

export async function fetchCarouselWithSlides(carousel_name) {
  const { data: carouselData, error: carouselError } = await supabase
    .from('carousels')
    .select('*')
    .eq('name', carousel_name);

  if (carouselError) {
    console.error('Error fetching carousel', carouselError);
    return [];
  }

  const carouselWithSlides = await Promise.all(
    carouselData.map(async (carousel) => {
      const slidesPromises = carousel.slide_ids.map((slide_id) =>
        fetchSlideById(slide_id)
      );

      const slides = await Promise.all(slidesPromises);

      return {
        ...carousel,
        slides
      };
    })
  );

  return carouselWithSlides;
}
