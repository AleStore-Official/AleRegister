import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://hsyyrcbibohwvbuwxwok.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeXlyY2JpYm9od3ZidXd4d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjE0MDcsImV4cCI6MjA3NjYzNzQwN30.2KsFsGYjwf_cA7Z9oglVthiaE1_jWYuQ6HMMm5UXsyo'
);

const REDIRECT_URL = "https://alestore-official.github.io/AleLogin";

function clearAuthData() {
  localStorage.clear();
}

export async function blockIfUnauthorized() {
  try {
    const email = localStorage.getItem("user_email");
    const password = localStorage.getItem("user_password");

    if (!email || !password) {
      clearAuthData();
      window.location.replace(REDIRECT_URL);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user || !data.user.email_confirmed_at) {
      clearAuthData();
      window.location.replace(REDIRECT_URL);
      return;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session?.user?.id) {
      clearAuthData();
      window.location.replace(REDIRECT_URL);
      return;
    }
  } catch {
    clearAuthData();
    window.location.replace(REDIRECT_URL);
  }
}

export function blockIfAuthenticated() {
  const email = localStorage.getItem("user_email");
  const password = localStorage.getItem("user_password");

  if (email && password) {
    window.location.replace("https://alestore-official.github.io/AleInfo");
  }
}
