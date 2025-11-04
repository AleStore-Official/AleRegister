import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://hsyyrcbibohwvbuwxwok.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeXlyY2JpYm9od3ZidXd4d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjE0MDcsImV4cCI6MjA3NjYzNzQwN30.2KsFsGYjwf_cA7Z9oglVthiaE1_jWYuQ6HMMm5UXsyo'
);

export async function blockIfUnauthorized() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData?.session?.user) {
    console.warn("User not authenticated.");
    redirectToRegister();
    return;
  }

  const { id, email } = sessionData.session.user;

  const { data: userRecord, error: queryError } = await supabase
    .from('utenti')
    .select('id')
    .eq('id', id)
    .single();

  if (queryError || !userRecord) {
    console.warn("User not found in 'utenti' table.");
    redirectToRegister();
    return;
  }

  console.log("Access granted for:", email);
}

function redirectToRegister() {
  window.location.href = "https://alestore-official.github.io/AleRegister/";
}