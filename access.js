import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://hsyyrcbibohwvbuwxwok.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeXlyY2JpYm9od3ZidXd4d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjE0MDcsImV4cCI6MjA3NjYzNzQwN30.2KsFsGYjwfcA7Z9oglVthiaE1jWYuQ6HMMm5UXsyo'
);

const REDIRECT_URL = "https://alestore-official.github.io/AleLogin";

function clearAuthData() {
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_password");
  localStorage.removeItem("access_verified");
  localStorage.removeItem("user_verified");
}

export async function blockIfUnauthorized() {
  try {
    const email = localStorage.getItem("user_email");
    const password = localStorage.getItem("user_password");

    if (!email || !password) {
      clearAuthData();
      window.location.href = REDIRECT_URL;
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user || !data.user.emailconfirmedat) {
      clearAuthData();
      window.location.href = REDIRECT_URL;
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session?.user?.id) {
      clearAuthData();
      window.location.href = REDIRECT_URL;
      return;
    }
  } catch {
    clearAuthData();
    window.location.href = REDIRECT_URL;
  }
}